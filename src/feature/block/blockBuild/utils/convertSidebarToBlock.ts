import type { Block, SidebarBlock } from '../types/block';
import { getBlockShapeByDuration } from './blockShapeByDuration';

// 사이드바 블록을 TimeLineBlockItem 타입에 맞추기 위해 임시로 작성한 함수
// 사이드바에서 각 Day로 추가하고 이후 에디터로 이동했을 때 임시로 랜덤한 위치
export function convertSidebarToBlock(item: SidebarBlock): Block {
  const { w, h, points, connectors } = getBlockShapeByDuration(item.duration || '1시간', item.category || '기타');

  return {
    blockId: item.id,
    name: item.name,
    category: item.category,
    duration: item.duration,
    x: Math.random() * 300,
    y: Math.random() * 300,
    w: w,
    h: h,
    points: points,
    connectors: connectors,
    imageUrl: item.imageUrl,
  };
}
