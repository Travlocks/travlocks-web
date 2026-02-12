import { useState, useMemo } from 'react';
import BlockCreateButton from '../button/BlockCreateButton';
import BlockTabs, { type TabType } from './BlockTabs';
import BlockItem from './BlockItem';
import BlockSearchInput from './BlockSearchInput';
import BlockCategoryButtons from './BlockCategoryButtons';
import { useBlockSearch } from '../../hooks/useBlockSearch';
import { useRegions } from '../../hooks/queries/useRegions';
import { useCategories } from '../../hooks/queries/useCategories';
import { usePopularBlocks, useCreatedBlocks, useBlocksByCategory } from '../../hooks/queries/useBlockList';
import { toSidebarBlock } from '../../utils/blockMapper';
import { filterCategoryBlocks } from '../../utils/blockFilter';
import EmptyBlockMessage from '../ui/EmplyBlockMessage';
import type { SidebarBlock } from '../../types/block';
import type { VlockModalRequestDto } from '@/feature/block/vlockModal/types/vlockModal.types';
interface BlockSidebarProps {
  items: SidebarBlock[];
  onOpenVlockModal?: (config: { type: 'create' | 'edit'; vlockId?: number; data?: VlockModalRequestDto }) => void;
}

const BlockSidebar = ({ onOpenVlockModal }: BlockSidebarProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('인기');

  const { inputProps, debouncedValue } = useBlockSearch({
    activeTab,
    delay: 300,
  });

  const { data: regionsData } = useRegions();

  // 모든 도시를 배열로 수집
  const allCities = useMemo(() => {
    const regions = regionsData?.data?.regions ?? [];
    const cities: Array<{ cityId: number; cityName: string; regionName: string }> = [];

    for (const region of regions) {
      for (const city of region.cities) {
        cities.push({
          cityId: city.cityId,
          cityName: city.cityName,
          regionName: region.regionName,
        });
      }
    }

    return cities;
  }, [regionsData]);

  // 첫 번째 cityId
  const firstCityId = useMemo(() => {
    return allCities.length > 0 ? allCities[0].cityId : 0;
  }, [allCities]);

  // 선택된 cityId
  const [selectedCityId, setSelectedCityId] = useState<number>(firstCityId);

  // allCities가 업데이트되면 첫 번째 cityId로 설정
  if (allCities.length > 0 && !allCities.some((city) => city.cityId === selectedCityId)) {
    setSelectedCityId(firstCityId);
  }

  // 카테고리 목록
  const { data: categoriesData } = useCategories();
  const categories = useMemo(() => categoriesData?.data?.categories ?? [], [categoriesData]);

  // 첫 카테고리 자동 선택
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(() => {
    const initialCategories = categoriesData?.data?.categories ?? [];
    return initialCategories.length > 0 ? initialCategories[0].id : null;
  });

  // 카테고리 목록이 로드되면 첫 번째 카테고리로 설정
  const firstCategoryId = useMemo(() => {
    return categories.length > 0 ? categories[0].id : null;
  }, [categories]);

  // selectedCategoryId가 null이고 카테고리가 있으면 첫 번째 카테고리로 설정
  if (selectedCategoryId === null && firstCategoryId !== null) {
    setSelectedCategoryId(firstCategoryId);
  }

  // 탭별 블록 조회
  const { data: popularData } = usePopularBlocks({ cityId: selectedCityId });
  const { data: createdData } = useCreatedBlocks({ cityId: selectedCityId });
  const { data: categoryData } = useBlocksByCategory({
    cityId: selectedCityId,
    categoryId: selectedCategoryId ?? 0,
  });

  // 서버 원본 데이터 검색 필터링
  const popularBlocks = useMemo(
    () => filterCategoryBlocks(popularData?.data ?? [], debouncedValue).map(toSidebarBlock),
    [popularData, debouncedValue],
  );
  const createdBlocks = useMemo(
    () => filterCategoryBlocks(createdData?.data ?? [], debouncedValue).map(toSidebarBlock),
    [createdData, debouncedValue],
  );
  const categoryBlocks = useMemo(
    () => filterCategoryBlocks(categoryData?.data ?? [], debouncedValue).map(toSidebarBlock),
    [categoryData, debouncedValue],
  );

  const isSearching = debouncedValue.trim().length > 0;

  const content = () => {
    switch (activeTab) {
      case '인기':
        return (
          <div className="flex flex-col gap-3">
            {popularBlocks.length > 0 ? (
              popularBlocks.map((item) => <BlockItem key={item.id} item={item} />)
            ) : (
              <EmptyBlockMessage isSearching={isSearching} emptyMessage="인기 블록이 없습니다" />
            )}
          </div>
        );
      case '카테고리':
        return (
          <>
            <BlockCategoryButtons
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />
            <div className="flex flex-col gap-3">
              {categoryBlocks.length > 0 ? (
                categoryBlocks.map((item) => <BlockItem key={item.id} item={item} />)
              ) : (
                <EmptyBlockMessage isSearching={isSearching} emptyMessage="블록이 없습니다" />
              )}
            </div>
          </>
        );
      case '생성':
        return (
          <div className="flex flex-col gap-3">
            <BlockCreateButton onClick={() => onOpenVlockModal?.({ type: 'create' })} />
            {createdBlocks.length > 0 ? (
              createdBlocks.map((item) => <BlockItem key={item.id} item={item} />)
            ) : isSearching ? (
              <EmptyBlockMessage isSearching={isSearching} emptyMessage="검색 결과가 없습니다" />
            ) : null}
          </div>
        );
    }
  };

  return (
    // BlockEditor의 에디터 영역 높이(h-[1091px])와 맞추기 위한 고정값
    <div className="flex flex-col h-[1091px] bg-base-color-6 border-r border-gray-200">
      {/* 헤더 타이틀 */}
      <div className="px-6 pt-8 pb-4">
        <h2 className="text-xl font-semibold text-black">Vlock 라이브러리</h2>
      </div>

      {/* 탭 영역 (별도 컴포넌트) */}
      <BlockTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 검색 인풋 */}
      <div className="px-6 pb-4">
        <BlockSearchInput activeTab={activeTab} {...inputProps} />
      </div>

      {/* 탭별 컨텐츠 */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden min-w-0 px-6 pb-6">{content()}</div>
    </div>
  );
};

export default BlockSidebar;
