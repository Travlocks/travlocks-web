import type { CategoryBlock } from '../types/blockCategory.types';
import type { SidebarBlock, CategoryType } from '../types/block';

// 블록 시간 포맷팅
const formatDuration = (stayHours: number): string => {
  if (stayHours < 1) {
    return `${Math.round(stayHours * 60)}분`;
  }
  if (Number.isInteger(stayHours)) {
    return `${stayHours}시간`;
  }
  const hours = Math.floor(stayHours);
  const minutes = Math.round((stayHours - hours) * 60);
  return `${hours}시간 ${minutes}분`;
};

// 사이드바 필드 데이터 가공
export const toSidebarBlock = (block: CategoryBlock): SidebarBlock => ({
  id: block.id,
  name: block.name,
  category: block.blockCategory.name as CategoryType,
  duration: formatDuration(block.blockCategory.stayHours),
  imageUrl: block.coverImgUrl || undefined,
});
