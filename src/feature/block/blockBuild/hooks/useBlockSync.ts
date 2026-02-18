import { useEffect, useRef, useCallback, type RefObject } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';
import { useShallow } from 'zustand/react/shallow';
import { QUERY_KEY } from '@/shared/constants/key';
import { deleteBlock, getBlockCanvas, patchBlocksReorder, postBlock } from '../apis/templateBlockApi';
import type { Block } from '../types/block';
import { mapCanvasToBlocksFallback } from '../utils/canvasFallbackMapper';
import { buildDerivedReorderRequest, derivePortMap, toCreateRequest } from '../utils/syncDerivation';

const DEBOUNCE_MS = 500;
const START_BLOCK_ID = 0;

type SyncStatus = 'idle' | 'pending' | 'syncing' | 'error';

type UseBlockSyncOptions = {
  onSummaryUpdatingChange?: (isUpdating: boolean) => void;
  isSyncPausedRef?: RefObject<boolean>;
};

/**
 * 블록 상태 변경을 감지하여 서버와 동기화하는 훅
 * - Debounced 자동 저장
 * - Optimistic updates + rollback on error
 */
export const useBlockSync = ({ onSummaryUpdatingChange, isSyncPausedRef }: UseBlockSyncOptions = {}) => {
  const queryClient = useQueryClient();
  const { templateId, currentDay, blocksByDay, updateBlocksByDay, setTemplateTitle, setTemplateCityIds } =
    useBlockTemplateStore(
      useShallow((s) => ({
        templateId: s.templateId,
        currentDay: s.currentDay,
        blocksByDay: s.blocksByDay,
        updateBlocksByDay: s.updateBlocksByDay,
        setTemplateTitle: s.setTemplateTitle,
        setTemplateCityIds: s.setTemplateCityIds,
      })),
    );

  const invalidateBlockSummary = useCallback(
    (templateIdNum: number) => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.blockSummary, templateIdNum],
      });
    },
    [queryClient],
  );

  const syncStatusRef = useRef<SyncStatus>('idle');
  const debounceTimersRef = useRef<Record<number, ReturnType<typeof setTimeout> | null>>({});
  const latestBlocksByDayRef = useRef<Record<number, Block[]>>({});
  const syncedBlocksByDayRef = useRef<Record<number, Block[]>>({});
  const suppressSyncRef = useRef(false);
  const hydratingDaysRef = useRef<Set<number>>(new Set());
  const isSyncingRef = useRef(false);
  const queuedSyncDaysRef = useRef<Set<number>>(new Set());
  const hydrateSeqByDayRef = useRef<Record<number, number>>({});
  const blocksByDayRef = useRef(blocksByDay);
  const currentDayRef = useRef(currentDay);
  const syncCurrentStateRef = useRef<(day: number) => Promise<void>>(async () => {});

  useEffect(() => {
    blocksByDayRef.current = blocksByDay;
  }, [blocksByDay]);

  useEffect(() => {
    currentDayRef.current = currentDay;
  }, [currentDay]);

  const setSyncStatus = useCallback(
    (status: SyncStatus) => {
      syncStatusRef.current = status;
      onSummaryUpdatingChange?.(status === 'pending' || status === 'syncing');
    },
    [onSummaryUpdatingChange],
  );

  const isPaused = useCallback(() => {
    return isSyncPausedRef?.current === true;
  }, [isSyncPausedRef]);

  const withSuppressedSync = useCallback(
    (updater: (prev: Record<number, Block[]>) => Record<number, Block[]>) => {
      suppressSyncRef.current = true;
      updateBlocksByDay(updater);
      queueMicrotask(() => {
        suppressSyncRef.current = false;
      });
    },
    [updateBlocksByDay],
  );

  /**
   * 특정 day의 캔버스를 서버에서 가져와 로컬 상태를 보정
   */
  const hydrateDayFromServer = useCallback(
    async (day: number, shouldInvalidateSummary: boolean = false) => {
      if (!templateId) return;
      const templateIdNum = Number(templateId);
      if (Number.isNaN(templateIdNum)) {
        console.error('[useBlockSync] Invalid templateId:', templateId);
        setSyncStatus('error');
        return;
      }

      const seq = (hydrateSeqByDayRef.current[day] ?? 0) + 1;
      hydrateSeqByDayRef.current[day] = seq;
      hydratingDaysRef.current.add(day);
      setSyncStatus('syncing');

      try {
        const response = await getBlockCanvas(templateIdNum, day);
        if (seq !== hydrateSeqByDayRef.current[day]) return;

        setTemplateTitle(response.data.title ?? '');
        setTemplateCityIds(response.data.cities ?? []);

        const mapped = mapCanvasToBlocksFallback(response.data);
        latestBlocksByDayRef.current[day] = mapped;
        syncedBlocksByDayRef.current[day] = mapped;

        withSuppressedSync((prev) => ({
          ...prev,
          [day]: mapped,
        }));

        if (shouldInvalidateSummary) {
          invalidateBlockSummary(templateIdNum);
        }

        setSyncStatus('idle');
      } catch (error) {
        console.error('[useBlockSync] Hydration failed:', error);
        setSyncStatus('error');
      } finally {
        if (seq === hydrateSeqByDayRef.current[day]) {
          hydratingDaysRef.current.delete(day);
        }
      }
    },
    [templateId, withSuppressedSync, setTemplateTitle, setTemplateCityIds, invalidateBlockSummary, setSyncStatus],
  );

  /**
   * 특정 day의 상태를 서버에 동기화 수행
   */
  const syncCurrentState = useCallback(
    async (day: number) => {
      if (isPaused()) return;

      if (!templateId) {
        setSyncStatus('idle');
        return;
      }
      if (hydratingDaysRef.current.has(day)) return;

      if (isSyncingRef.current) {
        queuedSyncDaysRef.current.add(day);
        return;
      }

      const templateIdNum = Number(templateId);
      if (Number.isNaN(templateIdNum)) {
        console.error('[useBlockSync] Invalid templateId:', templateId);
        setSyncStatus('error');
        return;
      }

      isSyncingRef.current = true;
      setSyncStatus('syncing');

      try {
        const currentBlocks = latestBlocksByDayRef.current[day] ?? blocksByDayRef.current[day] ?? [];
        const syncedBlocks = syncedBlocksByDayRef.current[day] ?? [];

        const currentNonStart = currentBlocks.filter((b) => b.blockId !== START_BLOCK_ID);
        const syncedNonStart = syncedBlocks.filter((b) => b.blockId !== START_BLOCK_ID);

        const currentTemplateVlockIds = new Set(
          currentNonStart.map((b) => b.templateVlocksId).filter((id): id is number => typeof id === 'number'),
        );

        const deleteTargets = syncedNonStart.filter(
          (b) => typeof b.templateVlocksId === 'number' && !currentTemplateVlockIds.has(b.templateVlocksId),
        );

        for (const block of deleteTargets) {
          if (!block.templateVlocksId) continue;
          await deleteBlock(templateIdNum, day, block.templateVlocksId);
        }

        let nextBlocks = currentBlocks;
        const ports = derivePortMap(currentBlocks, START_BLOCK_ID);
        const createTargets = currentNonStart.filter((b) => b.templateVlocksId == null);

        for (const block of createTargets) {
          const response = await postBlock(templateIdNum, day, toCreateRequest(block, ports.get(block.blockId)));
          const createdId = response?.data?.templateVlocksId;
          if (typeof createdId === 'number') {
            nextBlocks = nextBlocks.map((b) =>
              b.blockId === block.blockId && b.templateVlocksId == null ? { ...b, templateVlocksId: createdId } : b,
            );
          }
        }

        if (nextBlocks !== currentBlocks) {
          latestBlocksByDayRef.current[day] = nextBlocks;
          withSuppressedSync((prev) => ({
            ...prev,
            [day]: nextBlocks,
          }));
        }

        const reorderRequest = buildDerivedReorderRequest(nextBlocks, START_BLOCK_ID);
        if (reorderRequest.vlockOrders.length > 0) {
          await patchBlocksReorder(templateIdNum, day, reorderRequest);
        }

        syncedBlocksByDayRef.current[day] = nextBlocks;
        setSyncStatus('idle');
        invalidateBlockSummary(templateIdNum);
      } catch (error) {
        console.error('[useBlockSync] Sync failed:', error);
        setSyncStatus('error');

        // 서버 상태와 어긋나는 것을 방지하기 위해 최신 서버 상태를 재조회
        await hydrateDayFromServer(day, true);
      } finally {
        isSyncingRef.current = false;
        const queuedDay = queuedSyncDaysRef.current.values().next().value as number | undefined;
        if (typeof queuedDay === 'number') {
          queuedSyncDaysRef.current.delete(queuedDay);
          void syncCurrentState(queuedDay);
        }
      }
    },
    [templateId, withSuppressedSync, hydrateDayFromServer, invalidateBlockSummary, setSyncStatus, isPaused],
  );

  useEffect(() => {
    syncCurrentStateRef.current = syncCurrentState;
  }, [syncCurrentState]);

  /**
   * template/day 변경 시 서버 캔버스로 초기 동기화
   */
  useEffect(() => {
    if (!templateId) {
      Object.values(debounceTimersRef.current).forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
      debounceTimersRef.current = {};
      latestBlocksByDayRef.current = {};
      syncedBlocksByDayRef.current = {};
      hydratingDaysRef.current.clear();
      queuedSyncDaysRef.current.clear();
      setTemplateTitle('');
      setTemplateCityIds([]);
      setSyncStatus('idle');
      return;
    }
    void hydrateDayFromServer(currentDay);
  }, [templateId, currentDay, hydrateDayFromServer, setTemplateTitle, setTemplateCityIds, setSyncStatus]);

  /**
   * 블록 변경 감지 및 디바운스 동기화
   */
  useEffect(() => {
    const day = currentDay;
    const currentBlocks = blocksByDay[day] ?? [];
    latestBlocksByDayRef.current[day] = currentBlocks;

    if (isPaused()) {
      const pendingTimer = debounceTimersRef.current[day];
      if (pendingTimer) {
        clearTimeout(pendingTimer);
        debounceTimersRef.current[day] = null;
      }
      // 디바운스를 기다리는 도중 드래그가 되면 동기화를 일시 중지한다.
      if (syncStatusRef.current === 'pending') {
        setSyncStatus('idle');
      }
      return;
    }

    if (!templateId || suppressSyncRef.current || hydratingDaysRef.current.has(day)) return;

    setSyncStatus('pending');
    const prevTimer = debounceTimersRef.current[day];
    if (prevTimer) {
      clearTimeout(prevTimer);
    }

    debounceTimersRef.current[day] = setTimeout(() => {
      debounceTimersRef.current[day] = null;
      void syncCurrentState(day);
    }, DEBOUNCE_MS);
  }, [blocksByDay, currentDay, templateId, syncCurrentState, setSyncStatus, isPaused]);

  // 컴포넌트 언마운트 시 즉시 동기화
  useEffect(() => {
    return () => {
      Object.values(debounceTimersRef.current).forEach((timer) => {
        if (timer) clearTimeout(timer);
      });

      const day = currentDayRef.current;
      if (!isPaused() && !suppressSyncRef.current) {
        void syncCurrentStateRef.current(day);
      }
      onSummaryUpdatingChange?.(false);
    };
  }, [onSummaryUpdatingChange, isPaused]);
};
