import { useQuery } from '@tanstack/react-query';
import type {
  FilterState,
  SortOption,
  SearchTemplateParams,
  SearchTemplateResponseDTO,
} from '@/feature/search/types/searchTemplate.types';
import { TRANSPORT_TYPE_MAP } from '@/shared/constants/transportType';

// 템플릿 탐색 API 호출 함수
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

// 탐색 기준 상태를 API 파라미터로 변환하는 헬퍼 함수
function buildParams(keyword: string, filters: FilterState, sort: SortOption, page: number): SearchTemplateParams {
  const params: SearchTemplateParams = {
    sort,
    page,
    size: 9,
  };

  // 키워드 검색 처리
  if (keyword.trim()) {
    params.keyword = keyword.trim();
  }

  // 여행지
  if (filters.regions.length > 0) {
    params.region = filters.regions;
  }

  // 여행기간
  if (filters.tripDurations.length > 0) {
    params.trip = {
      days: filters.tripDurations[0],
      nights: filters.tripDurations[0] - 1,
    };
  }

  // 여행테마
  if (filters.travelThemes.length > 0) {
    params.travelTheme = filters.travelThemes;
  }

  // 이동수단
  if (filters.transportTypes.length > 0) {
    params.transportType = filters.transportTypes.map((id) => TRANSPORT_TYPE_MAP[id].key);
  }

  return params;
}

// 템플릿 탐색을 위한 React Query 훅
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
