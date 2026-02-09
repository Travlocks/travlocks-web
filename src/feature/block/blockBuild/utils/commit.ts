import type { Block, SidebarBlock } from '../types/block';
import type { Candidate } from './boardCandidate';
import type { SnapDecision } from './dockHint';
import { getDescendants } from './path';
import { getBoundingBox } from '@/shared/components/Block/blockShape';

export function detachBlock(params: { blocks: Block[]; startId: number; movingId: number }): Block[] {
  const { blocks, startId, movingId } = params;

  // START 블록은 분리 불가
  if (movingId === startId) return blocks;

  const moving = blocks.find((b) => b.blockId === movingId);
  if (!moving) return blocks;

  const parentId = moving.connectedFrom ?? null;
  if (parentId == null) return blocks; // 이미 free 상태

  // 부모로부터 분리 (자식 체인은 유지)
  return blocks.map((b) => {
    if (b.blockId === parentId) return { ...b, connectedTo: null };
    if (b.blockId === movingId) return { ...b, connectedFrom: null };
    return b;
  });
}

export function commitSidebarDrop(params: {
  blocks: Block[];
  tpl: SidebarBlock;
  candidate: Candidate;
  decision: SnapDecision;
}): Block[] {
  const { blocks, tpl, candidate, decision } = params;

  // 중복 금지
  if (blocks.some((b) => b.blockId === tpl.id)) return blocks;

  const { w, h } = getBoundingBox(candidate.points);

  const newBlock: Block = {
    blockId: tpl.id,
    name: tpl.name,
    category: tpl.category,
    duration: tpl.duration,
    imageUrl: tpl.imageUrl,
    x: decision.x,
    y: decision.y,
    w,
    h,
    points: candidate.points,
    connectors: candidate.connectors,
    color: candidate.color,
    connectedTo: null,
    connectedFrom: null,
  };

  // 스냅 실패 -> free로 생성
  if (!decision.canSnap || decision.targetId == null) {
    return [...blocks, newBlock];
  }

  // 스냅 대상 검증: socket이 비어있는 블록만
  const target = blocks.find((b) => b.blockId === decision.targetId);
  if (!target || target.connectedTo != null) {
    return [...blocks, newBlock];
  }

  // 스냅 성공 -> target에 append(연결)
  return blocks
    .map((b) => (b.blockId === decision.targetId ? { ...b, connectedTo: newBlock.blockId } : b))
    .concat({ ...newBlock, connectedFrom: decision.targetId });
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

  const newX = decision.canSnap ? decision.x : candidate.x;
  const newY = decision.canSnap ? decision.y : candidate.y;

  // 이동 delta 계산
  const dx = newX - moving.x;
  const dy = newY - moving.y;

  // 자손 블록 ID 조회
  const descendants = getDescendants(blocks, movingId);
  const toMove = new Set([movingId, ...descendants]);

  // 이동 대상 블록들 위치 업데이트
  let next = blocks.map((b) => (toMove.has(b.blockId) ? { ...b, x: b.x + dx, y: b.y + dy } : b));

  // 스냅 실패 -> free 이동만
  if (!decision.canSnap || decision.targetId == null) return next;

  const refreshed = next.find((b) => b.blockId === movingId);
  if (!refreshed) return next;
  if (refreshed.connectedFrom != null) return next;

  // 스냅 대상 검증: socket이 비어있는 블록만
  const target = next.find((b) => b.blockId === decision.targetId);
  if (!target || target.connectedTo != null) return next;

  // 자기 자손에 스냅 불가
  if (descendants.includes(decision.targetId)) return next;

  next = next.map((b) => {
    if (b.blockId === decision.targetId) return { ...b, connectedTo: movingId };
    if (b.blockId === movingId) return { ...b, connectedFrom: decision.targetId };
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
