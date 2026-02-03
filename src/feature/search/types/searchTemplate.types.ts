import type { RegionId } from '@/shared/constants/destinationCity';
import type { TripDurationId } from '@/shared/constants/tripDuration';
import type { TravleThemeId } from '@/shared/constants/travelTheme';
import type { TransportTypeId } from '@/shared/constants/transportType';
import type { Template } from '@/feature/template/template.types';

// 정렬 옵션 타입
export type SortOption = 'rating' | 'popular' | 'latest';

// 정렬 옵션 표시 이름
export const SORT_OPTIONS: Record<SortOption, string> = {
  rating: '별점순',
  popular: '인기순',
  latest: '최신순',
};

// 템플릿 탐색 API 요청 파라미터 (수정 가능성 높음)
export interface SearchTemplateParams {
  keyword?: string;
  region?: number[];
  trip?: {
    days: number;
    nights: number;
  };
  travelTheme?: number[];
  transportType?: string[];
  sort?: string;
  page?: number;
  size?: number;
}

// 필터 상태 타입
export interface FilterState {
  regions: RegionId[];
  tripDurations: TripDurationId[];
  travelThemes: TravleThemeId[];
  transportTypes: TransportTypeId[];
}

// 필터 태그 타입
export interface FilterTag {
  type: 'region' | 'tripDuration' | 'travelTheme' | 'transportType';
  id: number;
  label: string;
}

// 템플릿 검색 API 응답 타입 (수정 가능성 높음)
export interface SearchTemplateResponseDTO {
  templates: Template[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}
