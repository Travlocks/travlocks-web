import type { Block } from '../types/block';
import type { DockHintState } from '../types/drag';
import type { Candidate } from './boardCandidate';
import { snapToTail } from './snapToTail';

// 스냅 결정 타입
export type SnapDecision = {
  canSnap: boolean;
  x: number;
  y: number;
  edgeIndex: number | null;
  targetId: number | null;
};

// 스냅 결정 계산 (모든 스냅 가능 블록에서 가장 가까운 스냅 찾기)
export function computeSnapDecision(params: {
  candidate: Candidate;
  targets: Block[]; // 스냅 가능한 모든 블록 (socket이 비어있는 블록들)
  threshold: number;
}): SnapDecision {
  const { candidate, targets, threshold } = params;

  if (targets.length === 0) {
    return { canSnap: false, x: candidate.x, y: candidate.y, edgeIndex: null, targetId: null };
  }

  let bestSnap: { x: number; y: number; edgeIndex: number; targetId: number; distance: number } | null = null;

  // 모든 타겟 블록에 대해 스냅 계산
  for (const target of targets) {
    const snap = snapToTail({
      drag: {
        x: candidate.x,
        y: candidate.y,
        points: candidate.points,
        connectors: candidate.connectors,
      },
      tail: {
        blockId: target.blockId,
        x: target.x,
        y: target.y,
        points: target.points,
        connectors: target.connectors,
      },
      threshold,
    });

    if (snap.canSnap && snap.edgeIndex != null) {
      // 거리 계산
      const dx = snap.x - candidate.x;
      const dy = snap.y - candidate.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (!bestSnap || distance < bestSnap.distance) {
        bestSnap = {
          x: snap.x,
          y: snap.y,
          edgeIndex: snap.edgeIndex,
          targetId: target.blockId,
          distance,
        };
      }
    }
  }

  if (!bestSnap) {
    return { canSnap: false, x: candidate.x, y: candidate.y, edgeIndex: null, targetId: null };
  }

  return {
    canSnap: true,
    x: bestSnap.x,
    y: bestSnap.y,
    edgeIndex: bestSnap.edgeIndex,
    targetId: bestSnap.targetId,
  };
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
