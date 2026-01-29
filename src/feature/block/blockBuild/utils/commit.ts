import type { Block, SidebarBlock } from '../types/block';
import type { Candidate } from './boardCandidate';
import type { SnapDecision } from './dockHint';
import { getTailIdFromBlocks } from './path';

export function detachTail(params: { blocks: Block[]; startId: number; movingId: number }): Block[] {
  const { blocks, startId, movingId } = params;

  // START 블록은 분리 불가
  if (movingId === startId) return blocks;

  const tailId = getTailIdFromBlocks(blocks, startId) ?? startId;
  if (tailId !== movingId) return blocks;

  const tail = blocks.find((b) => b.blockId === movingId);
  if (!tail) return blocks;

  const parentId = tail.connectedFrom ?? null;
  if (parentId == null) return blocks; // 이미 free 상태

  return blocks.map((b) => {
    if (b.blockId === parentId) return { ...b, connectedTo: null };
    if (b.blockId === movingId) return { ...b, connectedFrom: null, connectedTo: null };
    return b;
  });
}

export function commitSidebarDrop(params: {
  blocks: Block[];
  tpl: SidebarBlock;
  candidate: Candidate;
  decision: SnapDecision;
  startId: number;
}): Block[] {
  const { blocks, tpl, candidate, decision, startId } = params;

  // 중복 금지
  if (blocks.some((b) => b.blockId === tpl.id)) return blocks;

  const newBlock: Block = {
    blockId: tpl.id,
    name: tpl.name,
    category: tpl.category,
    duration: tpl.duration,
    imageUrl: tpl.imageUrl,
    x: decision.x, // canSnap이면 스냅 위치, 아니면 candidate 위치
    y: decision.y,
    w: candidate.w,
    h: candidate.h,
    connectors: { input: null, output: null },
    connectedTo: null,
    connectedFrom: null,
  };

  // 스냅 실패 -> free로 생성
  if (!decision.canSnap || decision.targetId == null) {
    return [...blocks, newBlock];
  }

  // tail 안전 검증(단일 체인)
  const tailId = getTailIdFromBlocks(blocks, startId) ?? startId;
  if (tailId !== decision.targetId) {
    return [...blocks, newBlock];
  }

  const tail = blocks.find((b) => b.blockId === tailId);
  if (!tail || tail.connectedTo != null) {
    return [...blocks, newBlock];
  }

  // 스냅 성공 -> tail에 append(연결)
  return blocks
    .map((b) => (b.blockId === tailId ? { ...b, connectedTo: newBlock.blockId } : b))
    .concat({ ...newBlock, connectedFrom: tailId });
}

export function commitEditorDrop(params: {
  blocks: Block[];
  movingId: number;
  candidate: Candidate;
  decision: SnapDecision;
  startId: number;
}): Block[] {
  const { blocks, movingId, candidate, decision, startId } = params;

  if (movingId === startId) return blocks;

  const moving = blocks.find((b) => b.blockId === movingId);
  if (!moving) return blocks;

  let next = blocks.map((b) =>
    b.blockId === movingId
      ? {
          ...b,
          x: decision.canSnap ? decision.x : candidate.x,
          y: decision.canSnap ? decision.y : candidate.y,
        }
      : b,
  );

  // 스냅 실패 -> free 이동만
  if (!decision.canSnap || decision.targetId == null) return next;

  const refreshed = next.find((b) => b.blockId === movingId);
  if (!refreshed) return next;
  if (refreshed.connectedFrom != null) return next;

  // tail 검증
  const tailId = getTailIdFromBlocks(next, startId) ?? startId;
  if (tailId !== decision.targetId) return next;
  if (tailId === movingId) return next;

  const tail = next.find((b) => b.blockId === tailId);
  if (!tail || tail.connectedTo != null) return next;

  next = next.map((b) => {
    if (b.blockId === tailId) return { ...b, connectedTo: movingId };
    if (b.blockId === movingId) return { ...b, connectedFrom: tailId, connectedTo: null };
    return b;
  });

  return next;
}

// 블록 삭제 (연결 관계 정리)
export function removeBlock(params: { blocks: Block[]; blockId: number; startId: number }): Block[] {
  const { blocks, blockId, startId } = params;

  // START 블록은 삭제 불가
  if (blockId === startId) return blocks;

  const toRemove = blocks.find((b) => b.blockId === blockId);
  if (!toRemove) return blocks;

  const parentId = toRemove.connectedFrom ?? null;
  const childId = toRemove.connectedTo ?? null;

  // 연결 관계 정리 후 삭제
  return blocks
    .map((b) => {
      // 부모 블록의 connectedTo를 null로 설정
      if (parentId != null && b.blockId === parentId) {
        return { ...b, connectedTo: null };
      }
      // 자식 블록의 connectedFrom을 null로 설정
      if (childId != null && b.blockId === childId) {
        return { ...b, connectedFrom: null };
      }
      return b;
    })
    .filter((b) => b.blockId !== blockId);
}
