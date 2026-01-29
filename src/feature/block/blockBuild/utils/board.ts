import { clamp } from '@/feature/home/utils/random';
import { snapPoint } from './geometry';
import type { Modifier } from '@dnd-kit/core';

export type RectLike = { left: number; top: number; width: number; height: number };

// 활성 블록 영역 계산 (dnd-kit rect 타입 호환)
export function getActiveRect(eventRect: {
  current: { translated: RectLike | null; initial: RectLike | null };
}): RectLike | null {
  const rect = eventRect.current.translated ?? eventRect.current.initial;
  return rect;
}

// 활성 블록 중심 포인트 계산
export function calcBoardPointFromActiveRect(params: {
  boardEl: HTMLDivElement;
  activeRect: RectLike;
  w: number;
  h: number;
  grid?: number;
}) {
  const { boardEl, activeRect, w, h, grid = 0 } = params;

  const boardRect = boardEl.getBoundingClientRect();

  const centerX = activeRect.left - boardRect.left + activeRect.width / 2;
  const centerY = activeRect.top - boardRect.top + activeRect.height / 2;

  let pos = { x: centerX - w / 2, y: centerY - h / 2 };

  if (grid > 0) pos = snapPoint(pos, grid);

  pos.x = clamp(pos.x, 0, Math.max(0, boardRect.width - w));
  pos.y = clamp(pos.y, 0, Math.max(0, boardRect.height - h));

  return pos;
}

// 보드 내에서 포인트 제한
export function clampInBoard(params: {
  boardEl: HTMLDivElement;
  x: number;
  y: number;
  w: number;
  h: number;
  grid?: number;
}) {
  const { boardEl, w, h, grid = 0 } = params;

  const bw = boardEl.clientWidth;
  const bh = boardEl.clientHeight;

  let pos = { x: params.x, y: params.y };
  if (grid > 0) pos = snapPoint(pos, grid);

  pos.x = clamp(pos.x, 0, Math.max(0, bw - w));
  pos.y = clamp(pos.y, 0, Math.max(0, bh - h));

  return pos;
}

// 보드 내에서 포인트 제한 (줌 고려)
export const scaleDragByZoom =
  (zoom: number): Modifier =>
  ({ transform, active }) => {
    const type = active?.data.current?.type;

    if (type !== 'blockEditor') return transform;

    return {
      ...transform,
      x: transform.x / zoom,
      y: transform.y / zoom,
    };
  };
