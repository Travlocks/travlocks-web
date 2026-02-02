import type { DragMoveEvent, DragEndEvent } from '@dnd-kit/core';
import type { DragType } from '../types/drag';
import { calcBoardPointFromActiveRect } from './board';

export type Candidate = { x: number; y: number; w: number; h: number };

export function calcCandidate(params: {
  e: DragMoveEvent | DragEndEvent;
  boardEl: HTMLDivElement;
  defaultSize: { w: number; h: number };
  grid: number;
  zoom: number;
  pad: number;
}): Candidate | null {
  const { e, boardEl, defaultSize, grid, zoom, pad } = params;
  const type = e.active.data.current?.type as DragType | undefined;

  // translated rect를 사용하여 현재 드래그 중인 요소의 실제 화면 위치 계산
  const activeRect = e.active.rect.current.translated;
  if (!activeRect) return null;

  // Sidebar에서 드래그 중일 때
  if (type === 'blockSidebar') {
    return {
      ...calcBoardPointFromActiveRect({
        boardEl,
        activeRect,
        w: defaultSize.w,
        h: defaultSize.h,
        zoom,
        pad,
        grid,
      }),
      w: defaultSize.w,
      h: defaultSize.h,
    };
  }

  // Editor 블록 이동 중일 때
  if (type === 'blockEditor') {
    const { w, h } = e.active.data.current || {};
    const blockW = w ?? defaultSize.w;
    const blockH = h ?? defaultSize.h;

    return {
      ...calcBoardPointFromActiveRect({
        boardEl,
        activeRect,
        w: blockW,
        h: blockH,
        zoom,
        pad,
        grid,
      }),
      w: blockW,
      h: blockH,
    };
  }

  return null;
}
