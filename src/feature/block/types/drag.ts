import type { Block, SidebarBlock } from './block';

export type DragType = 'blockSidebar' | 'blockEditor';

// 현재 드래그 중인 블록 정보
export type ActiveDrag =
  | { type: 'blockSidebar'; block: SidebarBlock }
  | { type: 'blockEditor'; blockId: number; w: number; h: number; connectors: Block['connectors'] }
  | null;

// 연결 선 방향
export type ConnectorLine = 'top' | 'bottom' | 'left' | 'right';

// 스냅 프리뷰 정보
export type SnapPreviewsState = {
  x: number;
  y: number;
  w: number;
  h: number;
  visible: boolean;
  targetId?: string;
} | null;
