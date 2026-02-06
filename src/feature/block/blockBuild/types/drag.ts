import type { Block, SidebarBlock } from './block';

export type DragType = 'blockSidebar' | 'blockEditor' | 'blockTimeline';

// 현재 드래그 중인 블록 정보
export type ActiveDrag =
  | { type: 'blockSidebar'; block: SidebarBlock }
  | {
      type: 'blockEditor';
      blockId: number;
      points: Block['points'];
      connectors: Block['connectors'];
      color: Block['color'];
    }
  | {
      type: 'blockTimeline';
      block: SidebarBlock;
    }
  | null;

// 근처 블록 힌트 상태
export type DockHintState = {
  visible: boolean;
  targetId?: number;
  edgeIndex: number;
  x: number;
  y: number;
  color: Block['color'];
  points: Block['points'];
  connectors: Block['connectors'];
} | null;
