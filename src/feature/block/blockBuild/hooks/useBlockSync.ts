import { useEffect, useRef, useCallback } from 'react';
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
};

/**
 * 블록 상태 변경을 감지하여 서버와 동기화하는 훅
 * - Debounced 자동 저장
 * - Optimistic updates + rollback on error
 */
export const useBlockSync = ({ onSummaryUpdatingChange }: UseBlockSyncOptions = {}) => {
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
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestBlocksRef = useRef<Block[]>([]);
  const syncedBlocksRef = useRef<Block[]>([]);
  const suppressSyncRef = useRef(false);
  const isHydratingRef = useRef(false);
  const isSyncingRef = useRef(false);
  const requeueSyncRef = useRef(false);
  const hydrateSeqRef = useRef(0);

  const setSyncStatus = useCallback(
    (status: SyncStatus) => {
      syncStatusRef.current = status;
      onSummaryUpdatingChange?.(status === 'pending' || status === 'syncing');
    },
    [onSummaryUpdatingChange],
  );

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
   * 현재 day 캔버스를 서버에서 가져와 로컬 상태를 보정
   */
  const hydrateDayFromServer = useCallback(
    async (shouldInvalidateSummary: boolean = false) => {
      if (!templateId) return;
      const templateIdNum = Number(templateId);
      if (Number.isNaN(templateIdNum)) {
        console.error('[useBlockSync] Invalid templateId:', templateId);
        setSyncStatus('error');
        return;
      }

      const seq = ++hydrateSeqRef.current;
      isHydratingRef.current = true;
      setSyncStatus('syncing');

      try {
        const response = await getBlockCanvas(templateIdNum, currentDay);
        if (seq !== hydrateSeqRef.current) return;

        setTemplateTitle(response.data.title ?? '');
        setTemplateCityIds(response.data.cities ?? []);

        const mapped = mapCanvasToBlocksFallback(response.data);
        latestBlocksRef.current = mapped;
        syncedBlocksRef.current = mapped;

        withSuppressedSync((prev) => ({
          ...prev,
          [currentDay]: mapped,
        }));

        if (shouldInvalidateSummary) {
          invalidateBlockSummary(templateIdNum);
        }

        setSyncStatus('idle');
      } catch (error) {
        console.error('[useBlockSync] Hydration failed:', error);
        setSyncStatus('error');
      } finally {
        if (seq === hydrateSeqRef.current) {
          isHydratingRef.current = false;
        }
      }
    },
    [
      templateId,
      currentDay,
      withSuppressedSync,
      setTemplateTitle,
      setTemplateCityIds,
      invalidateBlockSummary,
      setSyncStatus,
    ],
  );

  /**
   * 현재 day의 상태를 서버에 동기화 수행
   */
  const syncCurrentState = useCallback(async () => {
    if (!templateId) {
      setSyncStatus('idle');
      return;
    }
    if (isHydratingRef.current) return;

    if (isSyncingRef.current) {
      requeueSyncRef.current = true;
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
      const currentBlocks = latestBlocksRef.current;
      const syncedBlocks = syncedBlocksRef.current;

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
        await deleteBlock(templateIdNum, currentDay, block.templateVlocksId);
      }

      let nextBlocks = currentBlocks;
      const ports = derivePortMap(currentBlocks, START_BLOCK_ID);
      const createTargets = currentNonStart.filter((b) => b.templateVlocksId == null);

      for (const block of createTargets) {
        const response = await postBlock(templateIdNum, currentDay, toCreateRequest(block, ports.get(block.blockId)));
        const createdId = response?.data?.templateVlocksId;
        if (typeof createdId === 'number') {
          nextBlocks = nextBlocks.map((b) =>
            b.blockId === block.blockId && b.templateVlocksId == null ? { ...b, templateVlocksId: createdId } : b,
          );
        }
      }

      if (nextBlocks !== currentBlocks) {
        latestBlocksRef.current = nextBlocks;
        withSuppressedSync((prev) => ({
          ...prev,
          [currentDay]: nextBlocks,
        }));
      }

      const reorderRequest = buildDerivedReorderRequest(nextBlocks, START_BLOCK_ID);
      if (reorderRequest.vlockOrders.length > 0) {
        await patchBlocksReorder(templateIdNum, currentDay, reorderRequest);
      }

      syncedBlocksRef.current = nextBlocks;
      setSyncStatus('idle');
      invalidateBlockSummary(templateIdNum);
    } catch (error) {
      console.error('[useBlockSync] Sync failed:', error);
      setSyncStatus('error');

      // 서버 상태와 어긋나는 것을 방지하기 위해 최신 서버 상태를 재조회
      await hydrateDayFromServer(true);
    } finally {
      isSyncingRef.current = false;
      if (requeueSyncRef.current) {
        requeueSyncRef.current = false;
        void syncCurrentState();
      }
    }
  }, [templateId, currentDay, withSuppressedSync, hydrateDayFromServer, invalidateBlockSummary, setSyncStatus]);

  /**
   * template/day 변경 시 서버 캔버스로 초기 동기화
   */
  useEffect(() => {
    if (!templateId) {
      syncedBlocksRef.current = [];
      setTemplateTitle('');
      setTemplateCityIds([]);
      setSyncStatus('idle');
      return;
    }
    void hydrateDayFromServer();
  }, [templateId, currentDay, hydrateDayFromServer, setTemplateTitle, setTemplateCityIds, setSyncStatus]);

  /**
   * 블록 변경 감지 및 디바운스 동기화
   */
  useEffect(() => {
    const currentBlocks = blocksByDay[currentDay] ?? [];
    latestBlocksRef.current = currentBlocks;

    if (!templateId || suppressSyncRef.current || isHydratingRef.current) return;

    setSyncStatus('pending');
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      void syncCurrentState();
    }, DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [blocksByDay, currentDay, templateId, syncCurrentState, setSyncStatus]);

  // 컴포넌트 언마운트 시 즉시 동기화
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (!suppressSyncRef.current && !isHydratingRef.current) {
        void syncCurrentState();
      }
      onSummaryUpdatingChange?.(false);
    };
  }, [syncCurrentState, onSummaryUpdatingChange]);
};
