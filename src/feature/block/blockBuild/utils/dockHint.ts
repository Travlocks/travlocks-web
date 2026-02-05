import type { Block } from '../types/block';
import type { DockHintState } from '../types/drag';
import type { Candidate } from './boardCandidate';
import { snapToTail, type TailSnapResult } from './snapToTail';

// 스냅 결정 타입
export type SnapDecision = {
  canSnap: boolean;
  x: number;
  y: number;
  edgeIndex: number | null;
  targetId: number | null;
};

// 스냅 결정 계산 (가장 가까운 홈과 탭 사이의 거리 계산) -> 홈과 탭 사이의 거리가 가장 가까운 쪽을 반환
export function computeSnapDecision(params: {
  candidate: Candidate;
  tail: Block | null;
  threshold: number;
}): SnapDecision {
  const { candidate, tail, threshold } = params;

  if (!tail) {
    return { canSnap: false, x: candidate.x, y: candidate.y, edgeIndex: null, targetId: null };
  }

  // 꼬리 스냅 결과 계산
  const snap: TailSnapResult = snapToTail({
    drag: {
      x: candidate.x,
      y: candidate.y,
      points: candidate.points,
      connectors: candidate.connectors,
    },
    tail: {
      blockId: tail.blockId,
      x: tail.x,
      y: tail.y,
      points: tail.points,
      connectors: tail.connectors,
    },
    threshold,
  });

  if (!snap.canSnap || snap.edgeIndex == null) {
    return { canSnap: false, x: candidate.x, y: candidate.y, edgeIndex: null, targetId: null };
  }

  return { canSnap: true, x: snap.x, y: snap.y, edgeIndex: snap.edgeIndex, targetId: tail.blockId };
}

// 근처 블록 힌트 빌드
export function buildDockHint(params: { candidate: Candidate; decision: SnapDecision }): DockHintState {
  const { candidate, decision } = params;

  if (!decision.canSnap || decision.edgeIndex == null || decision.targetId == null) return null;

  return {
    visible: true,
    targetId: decision.targetId,
    edgeIndex: decision.edgeIndex,
    x: decision.x,
    y: decision.y,
    color: candidate.color,
    points: candidate.points,
    connectors: candidate.connectors,
  };
}
