import type { Block, SidebarBlock } from '../types/block';

// 사이드바 블록을 TimeLineBlockItem 타입에 맞추기 위해 임시로 작성한 함수
export function convertSidebarToBlock(item: SidebarBlock): Block {
  return {
    blockId: item.id,
    name: item.name,
    category: item.category,
    duration: item.duration,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    points: [],
    connectors: [],
    imageUrl: item.imageUrl,
  };
}
