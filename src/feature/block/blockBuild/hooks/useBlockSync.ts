import { useEffect, useRef, useCallback } from 'react';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';
import { useShallow } from 'zustand/react/shallow';
import { postBlock, deleteBlock } from '../apis/templateBlockApi';
import type { Block } from '../types/block';

const DEBOUNCE_MS = 500;
const START_BLOCK_ID = 0;

type SyncStatus = 'idle' | 'pending' | 'syncing' | 'error';

interface PendingOperation {
  type: 'create' | 'delete';
  block: Block;
  orderNo: number;
}

/**
 * 블록 상태 변경을 감지하여 서버와 동기화하는 훅
 * - Debounced 자동 저장
 * - Optimistic updates + rollback on error
 */
export const useBlockSync = () => {
  const { templateId, currentDay, blocksByDay, updateBlocksByDay } = useBlockTemplateStore(
    useShallow((s) => ({
      templateId: s.templateId,
      currentDay: s.currentDay,
      blocksByDay: s.blocksByDay,
      updateBlocksByDay: s.updateBlocksByDay,
    })),
  );

  const syncStatusRef = useRef<SyncStatus>('idle');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousBlocksRef = useRef<Block[]>([]);
  const pendingOpsRef = useRef<PendingOperation[]>([]);

  // 현재 day의 블록 목록
  const currentBlocks = blocksByDay[currentDay] ?? [];

  /**
   * 이전 상태와 현재 상태를 비교하여 변경된 블록을 찾음
   */
  const detectChanges = useCallback((prevBlocks: Block[], nextBlocks: Block[]): PendingOperation[] => {
    const ops: PendingOperation[] = [];

    // START 블록 제외
    const prevFiltered = prevBlocks.filter((b) => b.blockId !== START_BLOCK_ID);
    const nextFiltered = nextBlocks.filter((b) => b.blockId !== START_BLOCK_ID);

    const prevIds = new Set(prevFiltered.map((b) => b.blockId));
    const nextIds = new Set(nextFiltered.map((b) => b.blockId));

    // 새로 추가된 블록 (blockId가 vlockId로 매핑됨)
    for (const block of nextFiltered) {
      if (!prevIds.has(block.blockId)) {
        const orderNo = nextFiltered.findIndex((b) => b.blockId === block.blockId) + 1;
        ops.push({ type: 'create', block, orderNo });
      }
    }

    // 삭제된 블록 (templateVlocksId가 있는 것만 동기화)
    for (const block of prevFiltered) {
      if (!nextIds.has(block.blockId) && block.templateVlocksId) {
        ops.push({ type: 'delete', block, orderNo: 0 });
      }
    }

    return ops;
  }, []);

  /**
   * 서버에 동기화 수행
   */
  const syncToServer = useCallback(async () => {
    if (!templateId || pendingOpsRef.current.length === 0) {
      syncStatusRef.current = 'idle';
      return;
    }

    const templateIdNum = Number(templateId);
    if (Number.isNaN(templateIdNum)) {
      console.error('[useBlockSync] Invalid templateId:', templateId);
      return;
    }

    syncStatusRef.current = 'syncing';
    const ops = [...pendingOpsRef.current];
    pendingOpsRef.current = [];

    // 롤백을 위해 이전 상태 저장
    const snapshotBeforeSync = previousBlocksRef.current;

    try {
      for (const op of ops) {
        if (op.type === 'create') {
          const response = await postBlock(templateIdNum, currentDay, {
            vlockId: op.block.blockId, // blockId를 vlockId로 사용
            orderNo: op.orderNo,
          });

          // 서버에서 생성된 templateVlocksId 업데이트
          if (response?.data?.templateVlocksId) {
            updateBlocksByDay((prev) => ({
              ...prev,
              [currentDay]: (prev[currentDay] ?? []).map((b) =>
                b.blockId === op.block.blockId ? { ...b, templateVlocksId: response.data.templateVlocksId } : b,
              ),
            }));
          }
        } else if (op.type === 'delete' && op.block.templateVlocksId) {
          await deleteBlock(templateIdNum, currentDay, op.block.templateVlocksId);
        }
      }

      syncStatusRef.current = 'idle';
    } catch (error) {
      console.error('[useBlockSync] Sync failed, rolling back:', error);
      syncStatusRef.current = 'error';

      // 롤백
      updateBlocksByDay((prev) => ({
        ...prev,
        [currentDay]: snapshotBeforeSync,
      }));

      // TODO: toast 에러 표시
    }
  }, [templateId, currentDay, updateBlocksByDay]);

  /**
   * 블록 변경 감지 및 디바운스 처리
   */
  useEffect(() => {
    const changes = detectChanges(previousBlocksRef.current, currentBlocks);

    if (changes.length > 0) {
      pendingOpsRef.current.push(...changes);
      syncStatusRef.current = 'pending';

      // 디바운스 타이머 리셋
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        syncToServer();
      }, DEBOUNCE_MS);
    }

    // 현재 상태를 이전 상태로 저장
    previousBlocksRef.current = [...currentBlocks];

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [currentBlocks, detectChanges, syncToServer]);

  // 컴포넌트 언마운트 시 즉시 동기화
  useEffect(() => {
    return () => {
      if (pendingOpsRef.current.length > 0) {
        syncToServer();
      }
    };
  }, [syncToServer]);
};
