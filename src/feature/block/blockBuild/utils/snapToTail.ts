export type DockSide = 'right' | 'bottom';

export type TailSnapResult = {
  canSnap: boolean;
  side: DockSide | null;
  x: number;
  y: number;
  targetId: number | null; // 스냅될 블록 아이디
};

// 피타고라스 (두 점 사이의 거리 계산)
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// 퍼즐 홈에 들어갈 기준점 계산 (tail의 홈 기준점) -> 퍼즐의 아래, 오른쪽 중심 기준점
const holePoint = (block: { x: number; y: number; w: number; h: number }, side: DockSide) => {
  if (side === 'right') return { x: block.x + block.w, y: block.y + block.h / 2 };
  return { x: block.x + block.w / 2, y: block.y + block.h };
};

// 퍼즐 탭에 들어갈 기준점 계산 (tail의 홈에 들어갈 "드래그 블럭의 탭" 기준점) -> 퍼즐의 위, 왼쪽 중심 기준점
const tabPoint = (block: { x: number; y: number; w: number; h: number }, side: DockSide) => {
  if (side === 'right') return { x: block.x, y: block.y + block.h / 2 };
  return { x: block.x + block.w / 2, y: block.y };
};

// 꼬리 스냅 결과 계산 (가장 가까운 홈과 탭 사이의 거리 계산) -> 홈과 탭 사이의 거리가 가장 가까운 쪽을 반환
export function snapToTail(params: {
  drag: { x: number; y: number; w: number; h: number };
  tail: { blockId: number; x: number; y: number; w: number; h: number };
  threshold?: number;
  connectorOffset?: number;
  allowBottom?: boolean;
}): TailSnapResult {
  const { drag, tail, threshold = 30, connectorOffset = 0, allowBottom = false } = params;

  const candidates: DockSide[] = allowBottom ? ['right', 'bottom'] : ['right'];

  let best: { side: DockSide; d: number; x: number; y: number } | null = null;

  for (const side of candidates) {
    const hp = holePoint(tail, side);
    const tp = tabPoint(drag, side);
    const d = dist(hp, tp);
    if (d > threshold) continue;

    let x = drag.x;
    let y = drag.y;

    if (side === 'right') {
      x = tail.x + tail.w - connectorOffset;
      y = tail.y + tail.h / 2 - drag.h / 2;
    } else {
      x = tail.x + tail.w / 2 - drag.w / 2;
      y = tail.y + tail.h - connectorOffset;
    }

    if (!best || d < best.d) best = { side, d, x, y };
  }

  if (!best) return { canSnap: false, side: null, x: drag.x, y: drag.y, targetId: null };
  return { canSnap: true, side: best.side, x: best.x, y: best.y, targetId: tail.blockId };
}
