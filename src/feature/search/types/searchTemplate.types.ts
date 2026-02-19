import type { Template } from '@/feature/home/types/template';
import type { SuccessPayload } from '@/shared/types/common';

/**
 * 템플릿 정렬 옵션 타입
 *
 * @remarks
 * - '별점순': 별점 높은 순
 * - '인기순': 인기 많은 순
 * - '최신순': 최신 등록 순
 */
export type SortOption = '별점순' | '인기순' | '최신순';

/**
 * 여행 기간 타입
 *
 * @remarks
 * - 'ONE_DAY': 1일
 * - 'TWO_DAYS': 2일
 * - 'THREE_DAYS': 3일
 * - 'FOUR_DAYS': 4일
 * - 'FIVE_DAYS': 5일
 */

export type TripDays = 'ONE_DAY' | 'TWO_DAYS' | 'THREE_DAYS' | 'FOUR_DAYS' | 'FIVE_DAYS';
/**
 * 정렬 옵션 목록
 */
export const SORT_OPTIONS_LIST: SortOption[] = ['별점순', '인기순', '최신순'];

/**
 * 템플릿 탐색 API 요청 파라미터
 *
 * @remarks
 * - API 스펙에 따른 검색 파라미터입니다.
 * - 모든 필드는 optional이며, 선택된 필터만 전송됩니다.
 */
export interface SearchTemplateParams {
  /** 검색 키워드 */
  keyword?: string;

  /** 권역 이름 배열 ('서울', '경기', '인천' 등) */
  cities?: string[];

  /** 여행 테마 이름 배열 ('자연', '문화', '맛집' 등) */
  themes?: string[];

  /** 여행 기간 배열 ('ONE_DAY', 'TWO_DAYS' 등) */
  tripDays?: string[];

  /** 교통 수단 이름 배열 ('도보', '차량', '대중교통') */
  transportTypes?: string[];

  /** 정렬 옵션 ('최신순', '별점순', '인기순') */
  sort?: string;

  /** 페이지 번호 (0부터 시작) */
  page?: number;

  /** 페이지 크기 */
  size?: number;
}

/**
 * 클라이언트 측 필터 상태
 *
 * @remarks
 * - 사용자가 선택한 필터 옵션을 관리하는 상태 타입입니다.
 */
export interface FilterState {
  /** 선택된 여행지 (권역) 이름 배열 */
  cities: string[];

  /** 선택된 여행 기간 값 배열 (ONE_DAY, TWO_DAYS 등) */
  tripDays: string[];

  /** 선택된 여행 테마 이름 배열 */
  themes: string[];

  /** 선택된 교통 수단 이름 배열 */
  transportTypes: string[];
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
  type: 'cities' | 'tripDays' | 'themes' | 'transportTypes';

  /** 필터 항목의 ID (이름 또는 키) */
  id: string;

  /** 화면에 표시될 레이블 */
  label: string;
}

/**
 * 템플릿 검색 API 응답 타입
 *
 * @remarks
 * - 서버 API 응답 페이로드입니다.
 */
export type SearchTemplateResponseDTO = SuccessPayload<Template[]>;
