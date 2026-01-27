import type { Block } from '../types/block';
import type { DockHintState } from '../types/drag';
import type { Candidate } from './boardCandidate';
import { snapToTail, type DockSide, type TailSnapResult } from './snapToTail';

// 스냅 결정 타입
export type SnapDecision = {
  canSnap: boolean;
  x: number;
  y: number;
  side: DockSide | null;
  targetId: number | null;
};

// 스냅 결정 계산 (가장 가까운 홈과 탭 사이의 거리 계산) -> 홈과 탭 사이의 거리가 가장 가까운 쪽을 반환
export function computeSnapDecision(params: {
  candidate: Candidate;
  tail: Block | null;
  threshold: number;
  connectorOffset: number;
  allowBottom: boolean;
}): SnapDecision {
  const { candidate, tail, threshold, connectorOffset, allowBottom } = params;

  if (!tail) {
    return { canSnap: false, x: candidate.x, y: candidate.y, side: null, targetId: null };
  }

  // 꼬리 스냅 결과 계산
  const snap: TailSnapResult = snapToTail({
    drag: candidate,
    tail,
    threshold,
    connectorOffset,
    allowBottom,
  });

  if (!snap.canSnap || !snap.side) {
    return { canSnap: false, x: candidate.x, y: candidate.y, side: null, targetId: null };
  }

  return { canSnap: true, x: snap.x, y: snap.y, side: snap.side, targetId: tail.blockId };
}

// 근처 블록 힌트 빌드
export function buildDockHint(params: { candidate: Candidate; decision: SnapDecision }): DockHintState {
  const { candidate, decision } = params;

  if (!decision.canSnap || !decision.side || decision.targetId == null) return null;

  return {
    visible: true,
    targetId: decision.targetId,
    side: decision.side,
    x: decision.x,
    y: decision.y,
    w: candidate.w,
    h: candidate.h,
  };
}
