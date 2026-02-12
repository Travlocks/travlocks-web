import type { SidebarBlock } from '../types/block';
import type { CategoryBlock } from '../types/blockCategory.types';

// 검색어 정규화 - 공백 제거, 소문자 변환
const normalize = (str: string): string => str.replace(/\s+/g, '').toLowerCase();

// 대상 문자열이 검색어를 포함하는지 확인
const includes = (target: string, query: string): boolean => normalize(target).includes(normalize(query));

// CategoryBlock 기준 필터링
export const filterCategoryBlocks = (blocks: CategoryBlock[], query: string): CategoryBlock[] => {
  const trimmed = query.trim();
  if (!trimmed) return blocks;

  return blocks.filter((block) => includes(block.name, trimmed) || includes(block.vlockCategory.name, trimmed));
};

// SidebarBlock 기준 필터링
export const filterSidebarBlocks = (blocks: SidebarBlock[], query: string): SidebarBlock[] => {
  const trimmed = query.trim();
  if (!trimmed) return blocks;

  return blocks.filter((block) => includes(block.name, trimmed));
};
