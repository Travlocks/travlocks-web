import { useQuery } from '@tanstack/react-query';
import type {
  FilterState,
  SortOption,
  SearchTemplateParams,
  SearchTemplateResponseDTO,
} from '@/feature/search/types/searchTemplate.types';
import { TRANSPORT_TYPE_MAP } from '@/shared/constants/transportType';
import { TRIP_DURATION_MAP } from '@/shared/constants/tripDuration';

/**
 * 템플릿 탐색 API를 호출하는 함수
 *
 * @remarks
 * - 현재는 Mock 데이터를 반환하며, 추후 실제 API 호출로 대체될 예정입니다.
 * - 로딩 상태 확인을 위한 1초 지연이 포함되어 있습니다. (제거 예정)
 *
 * @param params - 템플릿 검색 파라미터
 * @returns 템플릿 목록과 페이지네이션 정보
 */
async function fetchTemplates(params: SearchTemplateParams): Promise<SearchTemplateResponseDTO> {
  // api 호출 예정
  console.log('fetchTemplates', params);

  // mock 응답
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 로딩 상태를 확인하기 위한 지연(제거 예정)
  return {
    templates: [],
    pagination: {
      currentPage: params.page || 1,
      totalPages: 1,
      totalItems: 0,
    },
  };
}

/**
 * 탐색 기준 상태를 API 파라미터로 변환하는 헬퍼 함수
 *
 * @remarks
 * - 클라이언트 측 필터 상태를 서버 API가 요구하는 형식으로 변환합니다.
 * - 빈 값이나 선택되지 않은 필터는 파라미터에서 제외됩니다.
 * - 여행기간은 첫 번째 선택 값을 기준으로 days/nights를 계산합니다.
 * - 교통 수단은 ID를 키(문자열)로 변환합니다.
 *
 * @param keyword - 검색 키워드
 * @param filters - 필터 상태 (지역, 기간, 테마, 교통편)
 * @param sort - 정렬 옵션
 * @param page - 페이지 번호
 * @returns API 요청에 사용할 파라미터 객체
 */
function buildParams(keyword: string, filters: FilterState, sort: SortOption, page: number): SearchTemplateParams {
  const params: SearchTemplateParams = {
    sort,
    page,
    size: 9, // 페이지당 9개 템플릿
  };

  // 키워드 검색 처리
  if (keyword.trim()) {
    params.keyword = keyword.trim();
  }

  // 여행지
  if (filters.regions.length > 0) {
    params.region = filters.regions;
  }

  // 여행기간 (첫 번째 선택값 사용)
  if (filters.tripDurations.length > 0) {
    const tripDuration = TRIP_DURATION_MAP[filters.tripDurations[0]];
    params.trip = {
      days: tripDuration.trip.days,
      nights: tripDuration.trip.nights,
    };
  }

  // 여행테마
  if (filters.travelThemes.length > 0) {
    params.travelTheme = filters.travelThemes;
  }

  // 이동수단 (ID를 키로 변환)
  if (filters.transportTypes.length > 0) {
    params.transportType = filters.transportTypes.map((id) => TRANSPORT_TYPE_MAP[id].key);
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
    queryKey: ['template-search', keyword, filters, sort, page],
    queryFn: () => fetchTemplates(params),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    // 초기 로드 시에만 자동으로 가져오기
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
