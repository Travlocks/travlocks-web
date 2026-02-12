import type { RegionId } from '@/shared/constants/destinationCity';
import type { TripDurationId } from '@/shared/constants/tripDuration';
import type { TravleThemeId } from '@/shared/constants/travelTheme';
import type { TransportTypeId } from '@/shared/constants/transportType';
import type { Template } from '@/feature/template/template.types';

/**
 * 템플릿 정렬 옵션 타입
 *
 * @remarks
 * - 'rating': 별점 높은 순
 * - 'popular': 인기 많은 순
 * - 'latest': 최신 등록 순
 */
export type SortOption = 'rating' | 'popular' | 'latest';

/**
 * 정렬 옵션의 한글 표시 이름
 */
export const SORT_OPTIONS: Record<SortOption, string> = {
  rating: '별점순',
  popular: '인기순',
  latest: '최신순',
};

/**
 * 템플릿 탐색 API 요청 파라미터
 *
 * @remarks
 * - 서버 API 스펙에 따라 수정될 가능성이 높습니다.
 * - 모든 필드는 optional이며, 선택된 필터만 전송됩니다.
 */
export interface SearchTemplateParams {
  /** 검색 키워드 */
  keyword?: string;

  /** 여행지 ID 배열 */

  /** 여행 기간 (일, 박) */

  /** 교통 수단 키 배열 */
  transportType?: string[];

  /** 정렬 옵션 */
  sort?: string;

  /** 페이지 번호 (1부터 시작) */
  page?: number;
}

/**
 * 클라이언트 측 필터 상태
 *
 * @remarks
 * - 사용자가 선택한 필터 옵션을 관리하는 상태 타입입니다.
 * - 각 필드는 선택된 ID들의 배열입니다.
 */
export interface FilterState {
  /** 선택된 여행지 ID 배열 */
  regions: RegionId[];

  /** 선택된 여행 기간 ID 배열 */
  tripDurations: TripDurationId[];

  /** 선택된 여행 테마 ID 배열 */
  travelThemes: TravleThemeId[];

  /** 선택된 교통 수단 ID 배열 */
  transportTypes: TransportTypeId[];
}

/**
 * 필터 태그 타입
 *
 * @remarks
 * - UI에 표시되는 태그 형태의 필터 정보입니다.
 * - 태그 제거 시 type과 id를 사용하여 해당 필터를 식별합니다.
 */
export interface FilterTag {
  /** 필터 타입 */
  type: 'region' | 'tripDuration' | 'travelTheme' | 'transportType';

  /** 필터 항목의 ID */
  id: number;

  /** 화면에 표시될 레이블 */
  label: string;
}

/**
 * 템플릿 검색 API 응답 타입
 *
 * @remarks
 * - 서버 API 스펙에 따라 수정될 가능성이 높습니다.
 * - 템플릿 목록과 페이지네이션 정보를 포함합니다.
 */
export interface SearchTemplateResponseDTO {
  /** 검색된 템플릿 목록 */
  templates: Template[];

  /** 페이지네이션 정보 */
  pagination: {
    /** 현재 페이지 번호 */
    currentPage: number;

    /** 전체 페이지 수 */
    totalPages: number;

    /** 전체 아이템 수 */
    totalItems: number;
  };
}
