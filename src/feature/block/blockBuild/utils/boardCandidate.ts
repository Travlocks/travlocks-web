import type { DragMoveEvent, DragEndEvent } from '@dnd-kit/core';
import type { DragType } from '../types/drag';
import type { Connector, Point } from '@/shared/components/Block/blockShape';
import { createRectPoints, getBoundingBox } from '@/shared/components/Block/blockShape';
import { calcBoardPointFromActiveRect, clampInBoard, getActiveRect } from './board';

export type Candidate = {
  x: number;
  y: number;
  points: Point[];
  connectors: Connector[];
};

// 기본 커넥터 설정 (사각형 블록용)
const DEFAULT_CONNECTORS: Connector[] = [
  { type: 'plug', edgeIndex: 0, align: 'start' },
  { type: 'socket', edgeIndex: 1, align: 'start' },
  { type: 'socket', edgeIndex: 2, align: 'start' },
  { type: 'plug', edgeIndex: 3, align: 'end' },
];

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
    const points = createRectPoints(w, h);
    const { x, y } = calcBoardPointFromActiveRect({ boardEl, activeRect, w, h, grid });
    return { x, y, points, connectors: DEFAULT_CONNECTORS };
  }

  // Editor 블록 이동 중일 때 스냅 프리뷰
  if (type === 'blockEditor') {
    const startX = e.active.data.current?.startX as number | undefined;
    const startY = e.active.data.current?.startY as number | undefined;
    const points = e.active.data.current?.points as Point[] | undefined;
    const connectors = e.active.data.current?.connectors as Connector[] | undefined;
    if (startX == null || startY == null || !points || !connectors) return null;

    const { w, h } = getBoundingBox(points);
    const { x, y } = clampInBoard({
      boardEl,
      x: startX + e.delta.x,
      y: startY + e.delta.y,
      w,
      h,
      grid,
    });
    return { x, y, points, connectors };
  }

  return null;
}
