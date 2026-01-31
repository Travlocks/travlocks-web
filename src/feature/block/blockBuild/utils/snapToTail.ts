import { type Point, getConnectorCenter } from '@/shared/components/Block/blockShape';
import type { Block } from '../types/block';

export type TailSnapResult = {
  canSnap: boolean;
  edgeIndex: number | null; // 스냅될 edge 인덱스
  x: number;
  y: number;
  targetId: number | null; // 스냅될 블록 아이디
};

// 피타고라스 (두 점 사이의 거리 계산)
const dist = (a: Point, b: Point) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Block에서 스냅 계산에 필요한 속성만 추출
export type SnapBlock = Pick<Block, 'blockId' | 'x' | 'y' | 'points' | 'connectors'>;

// 드래그 중인 블록 후보 (아직 blockId 없음)
type SnapCandidate = Omit<SnapBlock, 'blockId'>;

const DEFAULT_TAB_WIDTH = 42;

/**
 * 드래그 중인 블록이 tail 블록에 스냅될 수 있는지 계산
 * tail의 socket과 drag의 plug를 매칭하여 가장 가까운 연결점을 찾음
 */
export function snapToTail(params: {
  drag: SnapCandidate;
  tail: SnapBlock;
  threshold?: number;
  tabWidth?: number;
}): TailSnapResult {
  const { drag, tail, threshold = 30, tabWidth = DEFAULT_TAB_WIDTH } = params;

  // tail의 모든 socket 찾기
  const tailSockets = tail.connectors.filter((c) => c.type === 'socket');
  // drag의 모든 plug 찾기
  const dragPlugs = drag.connectors.filter((c) => c.type === 'plug');

  if (tailSockets.length === 0 || dragPlugs.length === 0) {
    return { canSnap: false, edgeIndex: null, x: drag.x, y: drag.y, targetId: null };
  }

  let best: { edgeIndex: number; d: number; x: number; y: number } | null = null;

  // 각 socket-plug 쌍에 대해 거리 계산
  for (const socket of tailSockets) {
    for (const plug of dragPlugs) {
      // tail 기준 socket 중심점 (절대 좌표)
      const socketLocal = getConnectorCenter(tail.points, socket, tabWidth);
      if (!socketLocal) continue;
      const socketCenter = { x: tail.x + socketLocal.x, y: tail.y + socketLocal.y };

      // drag 기준 plug 중심점 (절대 좌표)
      const plugLocal = getConnectorCenter(drag.points, plug, tabWidth);
      if (!plugLocal) continue;
      const plugCenter = { x: drag.x + plugLocal.x, y: drag.y + plugLocal.y };

      const d = dist(socketCenter, plugCenter);
      if (d > threshold) continue;

      // 스냅 위치 계산: plug 중심이 socket 중심에 오도록 drag 위치 조정
      const snappedX = drag.x + (socketCenter.x - plugCenter.x);
      const snappedY = drag.y + (socketCenter.y - plugCenter.y);

      if (!best || d < best.d) {
        best = { edgeIndex: socket.edgeIndex, d, x: snappedX, y: snappedY };
      }
    }
  }

  if (!best) {
    return { canSnap: false, edgeIndex: null, x: drag.x, y: drag.y, targetId: null };
  }

  return {
    canSnap: true,
    edgeIndex: best.edgeIndex,
    x: best.x,
    y: best.y,
    targetId: tail.blockId,
  };
}
