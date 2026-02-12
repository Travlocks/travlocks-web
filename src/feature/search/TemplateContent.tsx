import { useState, useCallback } from 'react';
import SearchBar from './component/SearchBar';
import SearchFilter from './component/SearchFilter/SearchFilter';
import SortDropDown from './component/SortDropDown';
import FilterTags from './component/FilterTags';
import SearchResultCards from './component/ResultSection/SearchResultCards';
import { useTemplateSearch } from './hooks/useTemplateSearch';
import { useFilterTags } from './hooks/useFIlterTags';
import type { FilterState, SortOption, FilterTag } from './types/searchTemplate.types';
import TemplateHeader from '../template-search/components/TemplateHeader';

/**
 * 템플릿 탐색 페이지의 메인 컨텐츠 컴포넌트
 *
 * @remarks
 * - 검색어, 필터, 정렬 옵션을 관리하고 템플릿 탐색 API를 호출합니다.
 * - 초기 상태: 검색어 없음, 필터 선택 없음, 별점순 정렬, 1페이지
 * - '전체보기' 버튼으로 초기 상태로 리셋 가능
 */
/**
 * 초기 필터 및 정렬 상태 정의
 * 컴포넌트 외부로 이동하여 useCallback 의존성 문제 해결 및 성능 최적화
 */
const initialFilters: FilterState = {
  regions: [],
  tripDurations: [],
  travelThemes: [],
  transportTypes: [],
};

const initialSort: SortOption = 'rating';

const TemplateContent = () => {
  // 탐색 기준 상태 관리
  const [keyword, setKeyword] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [page, setPage] = useState<number>(1);

  // 필터 태그 생성
  const filterTags = useFilterTags(filters);

  // 템플릿 탐색 API 호출 (React Query)
  const { data, isLoading, isError } = useTemplateSearch(keyword, filters, sort, page);

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((searchKeyword: string) => {
    setKeyword(searchKeyword);
    setPage(1); // 검색어 변경 시 첫 페이지로 이동
  }, []);

  // 필터 변경 핸들러
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1); // 필터 변경 시 첫 페이지로 이동
  }, []);

  // 필터 초기화 핸들러
  const handleFilterReset = useCallback(() => {
    setFilters(initialFilters);
    setPage(1);
  }, []);

  // 필터 태그 제거 핸들러
  const handleRemoveTag = useCallback(
    (tag: FilterTag) => {
      const newFilters = { ...filters };

      switch (tag.type) {
        case 'region':
          newFilters.regions = newFilters.regions.filter((id) => id !== tag.id);
          break;
        case 'tripDuration':
          newFilters.tripDurations = newFilters.tripDurations.filter((id) => id !== tag.id);
          break;
        case 'travelTheme':
          newFilters.travelThemes = newFilters.travelThemes.filter((id) => id !== tag.id);
          break;
        case 'transportType':
          newFilters.transportTypes = newFilters.transportTypes.filter((id) => id !== tag.id);
          break;
      }

      setFilters(newFilters);
      setPage(1);
    },
    [filters],
  );

  // 정렬 옵션 변경 핸들러
  const handleSortChange = useCallback((newSort: SortOption) => {
    setSort(newSort);
    setPage(1); // 정렬 변경 시 첫 페이지로 이동
  }, []);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 변경 시 상단으로 스크롤
  }, []);

  // 템플릿 카드 클릭 핸들러
  const handleTemplateClick = useCallback((templateId: number) => {
    console.log('Template clicked:', templateId);
    // 사이드바 열릴 예정
  }, []);

  return (
    <div className="w-full flex flex-col gap-[40px] pb-[200px]">
      {/* 애니메이션, 검색 영역 */}
      <section className="flex justify-center items-center relative">
        <TemplateHeader onSearch={handleSearchChange} />
        <div className="absolute bottom-[40px] z-above">
          <SearchBar onSearch={handleSearchChange} placeholder="어디로 떠나고 싶으신가요?" />
        </div>
      </section>

      {/* 전체보기 버튼
      <section className="w-full flex justify-center bg-base-color-6 p-[10px] pb-[11px]">
        <div className="w-[1130px]">
          <button
            type="button"
            onClick={handleResetAll}
            className="h4 text-base-color-2 underline decoration-[8px] underline-offset-[10px] cursor-pointer">
            전체 보기
          </button>
        </div>
      </section> */}

      {/* 메인 레이아웃: 3-column (왼쪽 사이드 + 메인 컨텐츠 + 오른쪽 사이드) */}
      <div className="flex justify-center px-[40px]">
        <div className="flex gap-[30px] w-full max-w-[1860px]">
          {/* 왼쪽 사이드 패널: SearchFilter (sticky) */}
          <aside className="w-[300px] flex-shrink-0 sticky top-[40px] h-fit">
            <SearchFilter filters={filters} onFilterChange={handleFilterChange} onReset={handleFilterReset} />
          </aside>

          {/* 메인 컨텐츠 영역 (1200px 고정) */}
          <main className="flex-1 max-w-[1200px] flex flex-col gap-[40px]">
            {/* 필터 태그, 정렬 옵션 영역 */}
            <section className="flex flex-row items-center justify-between">
              <FilterTags tags={filterTags} onRemove={handleRemoveTag} />
              <div className="flex justify-end">
                <SortDropDown value={sort} onChange={handleSortChange} />
              </div>
            </section>

            {/* 검색 결과 */}
            <section>
              <SearchResultCards
                isLoading={isLoading}
                isError={isError}
                data={data}
                currentPage={page}
                onPageChange={handlePageChange}
                onTemplateClick={handleTemplateClick}
              />
            </section>
          </main>

          {/* 오른쪽 사이드 패널 (나중에 사용) */}
          <aside className="w-[300px] flex-shrink-0">{/* 추후 컨텐츠 추가 예정 */}</aside>
        </div>
      </div>
    </div>
  );
};

export default TemplateContent;
