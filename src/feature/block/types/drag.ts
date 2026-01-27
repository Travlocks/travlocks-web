import type { Block, SidebarBlock } from './block';
import type { DockSide } from '../utils/snapToTail';

export type DragType = 'blockSidebar' | 'blockEditor';

// 현재 드래그 중인 블록 정보
export type ActiveDrag =
  | { type: 'blockSidebar'; block: SidebarBlock }
  | { type: 'blockEditor'; blockId: number; w: number; h: number; connectors: Block['connectors'] }
  | null;

// 연결 선 방향
export type ConnectorLine = 'top' | 'bottom' | 'left' | 'right';

// 근처 블록 힌트 상태
export type DockHintState = {
  visible: boolean;
  targetId?: number;
  side: DockSide;
  x: number;
  y: number;
  w: number;
  h: number;
} | null;
