import { useEffect, useRef, useCallback } from 'react';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';
import { useShallow } from 'zustand/react/shallow';
import { postBlock, deleteBlock, patchBlocksReorder } from '../apis/templateBlockApi';
import type { ReorderedVlock } from '../blockBuild.type';
import type { Block } from '../types/block';

const DEBOUNCE_MS = 500;
const START_BLOCK_ID = 0;

type SyncStatus = 'idle' | 'pending' | 'syncing' | 'error';

const cloneBlocks = (blocks: Block[]): Block[] => blocks.map((b) => ({ ...b }));

const hasSyncRelevantChange = (prevBlocks: Block[], nextBlocks: Block[]) => {
  if (prevBlocks.length !== nextBlocks.length) return true;

  const prevMap = new Map(
    prevBlocks.map((b) => [
      b.blockId,
      {
        templateVlocksId: b.templateVlocksId ?? null,
        connectedFrom: b.connectedFrom ?? null,
        connectedTo: b.connectedTo ?? null,
      },
    ]),
  );

  for (const next of nextBlocks) {
    const prev = prevMap.get(next.blockId);
    if (!prev) return true;

    if (
      prev.templateVlocksId !== (next.templateVlocksId ?? null) ||
      prev.connectedFrom !== (next.connectedFrom ?? null) ||
      prev.connectedTo !== (next.connectedTo ?? null)
    ) {
      return true;
    }
  }

  return false;
};

const collectRemovedTemplateVlockIds = (prevBlocks: Block[], nextBlocks: Block[]): number[] => {
  const nextIds = new Set(nextBlocks.map((b) => b.blockId));
  return prevBlocks
    .filter((b) => !nextIds.has(b.blockId) && b.templateVlocksId != null)
    .map((b) => b.templateVlocksId as number);
};

const buildConnectedSetFromStart = (blocks: Block[], startId: number): Set<number> => {
  const byId = new Map(blocks.map((b) => [b.blockId, b]));
  const links = new Map<number, Set<number>>();

  for (const block of blocks) {
    links.set(block.blockId, new Set<number>());
  }

  for (const block of blocks) {
    const from = block.connectedFrom;
    const to = block.connectedTo;

    if (from != null && byId.has(from)) {
      links.get(block.blockId)?.add(from);
      links.get(from)?.add(block.blockId);
    }

    if (to != null && byId.has(to)) {
      links.get(block.blockId)?.add(to);
      links.get(to)?.add(block.blockId);
    }
  }

  const visited = new Set<number>();
  const queue: number[] = [startId];

  while (queue.length > 0) {
    const id = queue.shift() as number;
    if (visited.has(id)) continue;
    visited.add(id);

    const neighbors = links.get(id);
    if (!neighbors) continue;

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return visited;
};

const buildConnectedToOrder = (blocks: Block[], startId: number): number[] => {
  const byId = new Map(blocks.map((b) => [b.blockId, b]));
  const order: number[] = [];
  const visited = new Set<number>();

  let current = byId.get(startId);
  while (current && !visited.has(current.blockId)) {
    visited.add(current.blockId);
    order.push(current.blockId);
    current = current.connectedTo != null ? byId.get(current.connectedTo) : undefined;
  }

  return order;
};

const collectSyncOrderedBlocks = (blocks: Block[], startId: number): Block[] => {
  const byId = new Map(blocks.map((b) => [b.blockId, b]));
  const connectedSet = buildConnectedSetFromStart(blocks, startId);
  const chainOrder = buildConnectedToOrder(blocks, startId);
  const seen = new Set<number>();
  const ordered: Block[] = [];

  for (const blockId of chainOrder) {
    if (blockId === startId) continue;
    if (!connectedSet.has(blockId)) continue;

    const block = byId.get(blockId);
    if (!block || seen.has(blockId)) continue;

    ordered.push(block);
    seen.add(blockId);
  }

  for (const block of blocks) {
    if (block.blockId === startId) continue;
    if (!connectedSet.has(block.blockId)) continue;
    if (seen.has(block.blockId)) continue;

    ordered.push(block);
    seen.add(block.blockId);
  }

  return ordered;
};

const sameOrder = (left: number[], right: number[]) => {
  if (left.length !== right.length) return false;
  return left.every((id, idx) => id === right[idx]);
};

const applyServerOrder = (blocks: Block[], serverVlocks: ReorderedVlock[]): Block[] => {
  const sortedServerVlocks = [...serverVlocks].sort((a, b) => a.orderNo - b.orderNo);
  const byTemplateVlockId = new Map<number, Block>();
  const byVlockId = new Map<number, Block>();

  for (const block of blocks) {
    if (block.blockId === START_BLOCK_ID) continue;
    if (block.templateVlocksId != null && !byTemplateVlockId.has(block.templateVlocksId)) {
      byTemplateVlockId.set(block.templateVlocksId, block);
    }
    if (!byVlockId.has(block.blockId)) {
      byVlockId.set(block.blockId, block);
    }
  }

  const serverOrderBlocks: Block[] = [];
  const seenBlockIds = new Set<number>();

  for (const item of sortedServerVlocks) {
    const matched = byTemplateVlockId.get(item.templateVlocksId) ?? byVlockId.get(item.vlock.vlockId) ?? null;

    if (!matched || seenBlockIds.has(matched.blockId)) continue;

    serverOrderBlocks.push({
      ...matched,
      templateVlocksId: item.templateVlocksId,
    });
    seenBlockIds.add(matched.blockId);
  }

  if (serverOrderBlocks.length === 0) {
    return blocks;
  }

  const serverOrderIds = serverOrderBlocks.map((b) => b.blockId);
  const serverOrderSet = new Set(serverOrderIds);

  const blocksWithLatestServerIds = blocks.map((block) => {
    const matched = serverOrderBlocks.find((s) => s.blockId === block.blockId);
    if (!matched) return block;
    if (block.templateVlocksId === matched.templateVlocksId) return block;
    return { ...block, templateVlocksId: matched.templateVlocksId };
  });

  const currentServerOrderInChain = buildConnectedToOrder(blocksWithLatestServerIds, START_BLOCK_ID)
    .filter((blockId) => blockId !== START_BLOCK_ID)
    .filter((blockId) => serverOrderSet.has(blockId));

  const orderChanged = !sameOrder(currentServerOrderInChain, serverOrderIds);
  if (!orderChanged) {
    return blocksWithLatestServerIds;
  }

  const serverIndexByBlockId = new Map(serverOrderIds.map((id, idx) => [id, idx]));

  return blocksWithLatestServerIds.map((block) => {
    if (block.blockId === START_BLOCK_ID) {
      return {
        ...block,
        connectedFrom: null,
        connectedTo: serverOrderIds[0] ?? null,
      };
    }

    if (serverOrderSet.has(block.blockId)) {
      const index = serverIndexByBlockId.get(block.blockId) as number;
      return {
        ...block,
        connectedFrom: index === 0 ? START_BLOCK_ID : serverOrderIds[index - 1],
        connectedTo: index === serverOrderIds.length - 1 ? null : serverOrderIds[index + 1],
      };
    }

    const connectedFrom = block.connectedFrom;
    const connectedTo = block.connectedTo;

    const nextConnectedFrom =
      connectedFrom != null && (connectedFrom === START_BLOCK_ID || serverOrderSet.has(connectedFrom))
        ? null
        : (connectedFrom ?? null);

    const nextConnectedTo =
      connectedTo != null && (connectedTo === START_BLOCK_ID || serverOrderSet.has(connectedTo))
        ? null
        : (connectedTo ?? null);

    if (nextConnectedFrom === (connectedFrom ?? null) && nextConnectedTo === (connectedTo ?? null)) {
      return block;
    }

    return {
      ...block,
      connectedFrom: nextConnectedFrom,
      connectedTo: nextConnectedTo,
    };
  });
};

/**
 * 블록 상태 변경을 감지하여 서버와 동기화하는 훅
 * - Debounced 자동 저장
 * - START와 연결된 체인만 서버 동기화
 * - 서버 순서가 오면 서버를 우선하여 연결 관계를 보정
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
  const pendingDeleteIdsRef = useRef<Set<number>>(new Set());
  const hasPendingSyncRef = useRef(false);
  const skipNextDetectionRef = useRef(false);

  const scheduleSync = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      void syncToServerRef.current();
    }, DEBOUNCE_MS);
  }, []);

  const syncToServer = useCallback(async () => {
    if (syncStatusRef.current === 'syncing') return;

    if (!templateId) {
      syncStatusRef.current = 'idle';
      return;
    }

    if (!hasPendingSyncRef.current && pendingDeleteIdsRef.current.size === 0) {
      syncStatusRef.current = 'idle';
      return;
    }

    const templateIdNum = Number(templateId);
    if (Number.isNaN(templateIdNum)) {
      console.error('[useBlockSync] Invalid templateId:', templateId);
      syncStatusRef.current = 'error';
      return;
    }

    syncStatusRef.current = 'syncing';
    hasPendingSyncRef.current = false;

    const dayNo = currentDay;
    const snapshotBeforeSync = cloneBlocks(useBlockTemplateStore.getState().blocksByDay[dayNo] ?? []);
    const deleteIds = Array.from(pendingDeleteIdsRef.current);
    pendingDeleteIdsRef.current.clear();

    try {
      for (let index = 0; index < deleteIds.length; index += 1) {
        const templateVlocksId = deleteIds[index];

        try {
          await deleteBlock(templateIdNum, dayNo, templateVlocksId);
        } catch (error) {
          for (let retryIndex = index; retryIndex < deleteIds.length; retryIndex += 1) {
            pendingDeleteIdsRef.current.add(deleteIds[retryIndex]);
          }
          throw error;
        }
      }

      const afterDeleteBlocks = cloneBlocks(useBlockTemplateStore.getState().blocksByDay[dayNo] ?? []);
      const syncOrderedBlocks = collectSyncOrderedBlocks(afterDeleteBlocks, START_BLOCK_ID);
      const templateVlocksIdByBlockId = new Map<number, number>();

      for (const block of syncOrderedBlocks) {
        if (block.templateVlocksId == null) {
          const orderNo = syncOrderedBlocks.findIndex((candidate) => candidate.blockId === block.blockId) + 1;
          const response = await postBlock(templateIdNum, dayNo, {
            vlockId: block.blockId,
            orderNo,
          });

          if (response?.data?.templateVlocksId != null) {
            templateVlocksIdByBlockId.set(block.blockId, response.data.templateVlocksId);
          }
        }
      }

      const latestBlocks = cloneBlocks(useBlockTemplateStore.getState().blocksByDay[dayNo] ?? []);
      const latestWithCreatedTemplateIds = latestBlocks.map((block) => {
        const createdTemplateVlocksId = templateVlocksIdByBlockId.get(block.blockId);
        if (createdTemplateVlocksId == null) return block;
        return { ...block, templateVlocksId: createdTemplateVlocksId };
      });

      const latestSyncOrderedBlocks = collectSyncOrderedBlocks(latestWithCreatedTemplateIds, START_BLOCK_ID);
      const reorderPayload = latestSyncOrderedBlocks
        .filter((block) => block.templateVlocksId != null)
        .map((block, index) => ({
          templateVlocksId: block.templateVlocksId as number,
          orderNo: index + 1,
        }));

      let reconciledBlocks = latestWithCreatedTemplateIds;
      if (reorderPayload.length > 0) {
        const reorderResponse = await patchBlocksReorder(templateIdNum, dayNo, {
          vlockOrders: reorderPayload,
        });

        if (reorderResponse?.data?.vlocks) {
          reconciledBlocks = applyServerOrder(latestWithCreatedTemplateIds, reorderResponse.data.vlocks);
        }
      }

      skipNextDetectionRef.current = true;
      updateBlocksByDay((prev) => ({
        ...prev,
        [dayNo]: reconciledBlocks,
      }));

      syncStatusRef.current = 'idle';
    } catch (error) {
      console.error('[useBlockSync] Sync failed, rolling back:', error);
      hasPendingSyncRef.current = true;
      syncStatusRef.current = 'error';

      skipNextDetectionRef.current = true;
      updateBlocksByDay((prev) => ({
        ...prev,
        [dayNo]: snapshotBeforeSync,
      }));
    } finally {
      if (hasPendingSyncRef.current || pendingDeleteIdsRef.current.size > 0) {
        scheduleSync();
      }
    }
  }, [templateId, currentDay, updateBlocksByDay, scheduleSync]);

  const syncToServerRef = useRef(syncToServer);
  syncToServerRef.current = syncToServer;

  useEffect(() => {
    const currentBlocks = blocksByDay[currentDay] ?? [];

    if (skipNextDetectionRef.current) {
      skipNextDetectionRef.current = false;
      previousBlocksRef.current = cloneBlocks(currentBlocks);
      return;
    }

    const removedTemplateVlockIds = collectRemovedTemplateVlockIds(previousBlocksRef.current, currentBlocks);
    for (const templateVlocksId of removedTemplateVlockIds) {
      pendingDeleteIdsRef.current.add(templateVlocksId);
    }

    const changed = hasSyncRelevantChange(previousBlocksRef.current, currentBlocks);
    if (changed || removedTemplateVlockIds.length > 0) {
      hasPendingSyncRef.current = true;
      syncStatusRef.current = syncStatusRef.current === 'syncing' ? 'syncing' : 'pending';

      if (syncStatusRef.current !== 'syncing') {
        scheduleSync();
      }
    }

    previousBlocksRef.current = cloneBlocks(currentBlocks);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [blocksByDay, currentDay, scheduleSync]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      void syncToServerRef.current();
    };
  }, []);
};
