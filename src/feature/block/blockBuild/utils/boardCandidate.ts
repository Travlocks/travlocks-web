import type { DragMoveEvent, DragEndEvent } from '@dnd-kit/core';
import type { DragType } from '../types/drag';
import { calcBoardPointFromActiveRect } from './board';
import type { Connector, Point } from '@/shared/components/Block/blockShape';
import { getBoundingBox } from '@/shared/components/Block/blockShape';
import { categoryColor } from '../components/side/block-styles';
import { type CategoryType } from '../types/block';
import { getBlockShapeByDuration } from './blockShapeByDuration';

export type Candidate = {
  x: number;
  y: number;
  points: Point[];
  connectors: Connector[];
  color?: string;
};

export function calcCandidate(params: {
  e: DragMoveEvent | DragEndEvent;
  boardEl: HTMLDivElement;
  defaultSize: { w: number; h: number };
  grid: number;
  zoom: number;
  pad: number;
}): Candidate | null {
  const { e, boardEl, grid, zoom, pad } = params;
  const type = e.active.data.current?.type as DragType | undefined;

  // translated rect를 사용하여 현재 드래그 중인 요소의 실제 화면 위치 계산
  const activeRect = e.active.rect.current.translated;
  if (!activeRect) return null;

  // Sidebar에서 드래그 중일 때
  if (type === 'blockSidebar') {
    const category = e.active.data.current?.item?.category as CategoryType | undefined;
    const duration = e.active.data.current?.item?.duration as string | undefined;

    // 시간별 블록 모양 생성
    const shapeConfig = getBlockShapeByDuration(duration || '1시간', category || '기타');
    const { w, h, points, connectors } = shapeConfig;

    const { x, y } = calcBoardPointFromActiveRect({
      boardEl,
      activeRect,
      w,
      h,
      zoom,
      pad,
      grid,
    });

    const color = category ? categoryColor[category as keyof typeof categoryColor] : undefined;

    return { x, y, points, connectors, color };
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
