import type { DragMoveEvent, DragEndEvent } from '@dnd-kit/core';
import type { DragType } from '../types/drag';
import { calcBoardPointFromActiveRect, clampInBoard, getActiveRect } from './board';

export type Candidate = { x: number; y: number; w: number; h: number };

export function calcCandidate(params: {
  e: DragMoveEvent | DragEndEvent;
  boardEl: HTMLDivElement;
  defaultSize: { w: number; h: number };
  grid: number;
}): Candidate | null {
  const { e, boardEl, defaultSize, grid } = params;
  const type = e.active.data.current?.type as DragType | undefined;

  // Sidebar에서 드래그 중일 때 스냅 프리뷰
  if (type === 'blockSidebar') {
    const activeRect = getActiveRect(e.active.rect);
    if (!activeRect) return null;

    const w = defaultSize.w;
    const h = defaultSize.h;
    const { x, y } = calcBoardPointFromActiveRect({ boardEl, activeRect, w, h, grid });
    return { x, y, w, h };
  }

  // Editor 블록 이동 중일 때 스냅 프리뷰
  if (type === 'blockEditor') {
    const startX = e.active.data.current?.startX as number | undefined;
    const startY = e.active.data.current?.startY as number | undefined;
    const w = e.active.data.current?.w as number | undefined;
    const h = e.active.data.current?.h as number | undefined;
    if (startX == null || startY == null || !w || !h) return null;

    const { x, y } = clampInBoard({
      boardEl,
      x: startX + e.delta.x,
      y: startY + e.delta.y,
      w,
      h,
      grid,
    });
    return { x, y, w, h };
  }

  return null;
}
