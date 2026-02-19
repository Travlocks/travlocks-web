import { useQuery } from '@tanstack/react-query';
import type { FilterState, SortOption, SearchTemplateParams } from '@/feature/search/types/searchTemplate.types';
import { QUERY_KEY } from '@/shared/constants/key';
import { getTemplates } from '../api/search.api';

/**
 * 탐색 기준 상태를 API 파라미터로 변환하는 헬퍼 함수
 *
 * @param keyword - 검색 키워드
 * @param filters - 필터 상태 (지역, 기간, 테마, 교통편)
 * @param sort - 정렬 옵션 ("최신순", "별점순", "인기순")
 * @param page - 페이지 번호 (1부터 시작 -> 0부터 시작으로 변환)
 * @returns API 요청에 사용할 파라미터 객체
 */
function buildParams(keyword: string, filters: FilterState, sort: string, page: number): SearchTemplateParams {
  const params: SearchTemplateParams = {
    sort,
    page: page - 1, // API는 0-based page index 사용
    size: 9,
  };

  if (keyword.trim()) {
    params.keyword = keyword.trim();
  }

  if (filters.cities.length > 0) {
    params.cities = filters.cities;
  }

  if (filters.themes.length > 0) {
    params.themes = filters.themes;
  }

  if (filters.tripDays.length > 0) {
    params.tripDays = filters.tripDays;
  }

  if (filters.transportTypes.length > 0) {
    params.transportTypes = filters.transportTypes;
  }

  return params;
}

/**
 * 템플릿 탐색을 위한 React Query 커스텀 훅
 *
 * @remarks
 * - 검색어, 필터, 정렬, 페이지에 따라 템플릿 목록을 가져옵니다.
 * - React Query를 사용하여 캐싱, 로딩, 에러 상태를 자동으로 관리합니다.
 * - staleTime: 5분 - 데이터가 5분 동안은 fresh 상태로 유지됩니다.
 * - gcTime: 10분 - 사용하지 않는 데이터는 10분 후 가비지 컬렉션됩니다.
 * - 윈도우 포커스나 재연결 시 자동 refetch를 비활성화했습니다.
 *
 * @param keyword - 검색 키워드
 * @param filters - 필터 상태
 * @param sort - 정렬 옵션
 * @param page - 현재 페이지 번호
 * @returns React Query의 쿼리 결과 객체 (data, isLoading, isError 등)
 */
export function useTemplateSearch(keyword: string, filters: FilterState, sort: SortOption, page: number) {
  const params = buildParams(keyword, filters, sort, page);
  return useQuery({
    queryKey: [QUERY_KEY.templateSearch, keyword, filters, sort, page],
    queryFn: () => getTemplates(params),
    staleTime: 0, // 항상 최신 데이터 유지
    gcTime: 0, // 캐시 즉시 만료 (데이터 꼬임 방지)
    // 초기 로드 시에만 자동으로 가져오기
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
