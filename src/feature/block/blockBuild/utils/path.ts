import type { Block } from '../types/block';

// 경로 순서 생성 (시작 아이디부터 꼬리까지 순서대로 배열로 반환)
export function buildPathOrder(blocks: Block[], startId: number) {
  const byId = new Map(blocks.map((b) => [b.blockId, b]));
  const order: number[] = [];
  const visited = new Set<number>();

  let cur = byId.get(startId);
  while (cur && !visited.has(cur.blockId)) {
    visited.add(cur.blockId);
    order.push(cur.blockId);
    cur = cur.connectedTo != null ? byId.get(cur.connectedTo) : undefined;
  }

  return order;
}

// 꼬리 아이디 조회 (경로 순서 중 마지막 아이디 반환)
export function getTailIdFromBlocks(blocks: Block[], startId: number) {
  const order = buildPathOrder(blocks, startId);
  return order.length ? order[order.length - 1] : null;
}

// 꼬리 분리 (분리된 꼬리 아이디 반환)
export function detachTailFromBlocks(blocks: Block[], startId: number) {
  const order = buildPathOrder(blocks, startId);
  if (order.length <= 1) {
    return { nextBlocks: blocks, detachedId: null as number | null, newTailId: startId };
  }

  const oldTailId = order[order.length - 1];
  const newTailId = order[order.length - 2];

  const nextBlocks = blocks.map((b) => {
    if (b.blockId === newTailId) {
      return { ...b, connectedTo: null };
    }
    if (b.blockId === oldTailId) {
      return { ...b, connectedFrom: null, connectedTo: null };
    }
    return b;
  });

  return { nextBlocks, detachedId: oldTailId, newTailId };
}
