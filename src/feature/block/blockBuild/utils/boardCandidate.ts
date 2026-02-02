import type { DragMoveEvent, DragEndEvent } from '@dnd-kit/core';
import type { DragType } from '../types/drag';
import { calcBoardPointFromActiveRect } from './board';
import type { Connector, Point } from '@/shared/components/Block/blockShape';
import { createRectPoints, getBoundingBox } from '@/shared/components/Block/blockShape';
import { categoryColor } from '../components/side/block-styles';
import { type CategoryType } from '../types/block';

export type Candidate = {
  x: number;
  y: number;
  points: Point[];
  connectors: Connector[];
  color?: string;
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
    const w = defaultSize.w;
    const h = defaultSize.h;
    const points = createRectPoints(w, h);
    const { x, y } = calcBoardPointFromActiveRect({
      boardEl,
      activeRect,
      w,
      h,
      zoom,
      pad,
      grid,
    });

    const category = e.active.data.current?.item?.category as CategoryType | undefined;
    const color = category ? categoryColor[category as keyof typeof categoryColor] : undefined;

    return { x, y, points, connectors: DEFAULT_CONNECTORS, color };
  }

  // Editor 블록 이동 중일 때
  if (type === 'blockEditor') {
    const points = e.active.data.current?.points as Point[] | undefined;
    const connectors = e.active.data.current?.connectors as Connector[] | undefined;
    const color = e.active.data.current?.color as string | undefined;
    if (!points || !connectors) return null;

    const { w, h } = getBoundingBox(points);
    const { x, y } = calcBoardPointFromActiveRect({
      boardEl,
      activeRect,
      w,
      h,
      zoom,
      pad,
      grid,
    });

    return { x, y, points, connectors, color };
  }

  return null;
}
