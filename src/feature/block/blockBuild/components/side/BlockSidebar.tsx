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

const BlockSidebar = () => {
  const [activeTab, setActiveTab] = useState<TabType>('인기');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const { inputProps } = useBlockSearch({
    activeTab,
    delay: 300,
  });

  // TODO: cityId 받으면 그거 사용
  // 임시로 첫 번째 cityId만 사용 하드코딩
  const { data: regionsData } = useRegions();
  const cityId = useMemo(() => {
    const regions = regionsData?.data?.regions ?? [];
    for (const region of regions) {
      if (region.cities.length > 0) {
        return region.cities[0].cityId;
      }
    }
    return 0;
  }, [regionsData]);

  // 카테고리 목록
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data?.categories ?? [];

  // 탭별 블록 조회
  const { data: popularData } = usePopularBlocks({ cityId });
  const { data: createdData } = useCreatedBlocks({ cityId });
  const { data: categoryData } = useBlocksByCategory({
    cityId,
    categoryId: selectedCategoryId ?? 0,
  });

  // 사이드바 필드 데이터 가공
  const popularBlocks = useMemo(() => (popularData?.data ?? []).map(toSidebarBlock), [popularData]);
  const createdBlocks = useMemo(() => (createdData?.data ?? []).map(toSidebarBlock), [createdData]);
  const categoryBlocks = useMemo(() => (categoryData?.data ?? []).map(toSidebarBlock), [categoryData]);

  // 첫 카테고리 자동 선택
  if (categories.length > 0 && selectedCategoryId === null) {
    setSelectedCategoryId(categories[0].id);
  }

  const content = () => {
    switch (activeTab) {
      case '인기':
        return (
          <div className="flex flex-col gap-3">
            {popularBlocks.length > 0 ? (
              popularBlocks.map((item) => <BlockItem key={item.id} item={item} />)
            ) : (
              <p className="text-center text-base-color-2 py-4">인기 블록이 없습니다</p>
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
                <p className="text-center text-base-color-2 py-4">블록이 없습니다</p>
              )}
            </div>
          </>
        );
      case '생성':
        return (
          <div className="flex flex-col gap-3">
            {createdBlocks.length > 0 ? createdBlocks.map((item) => <BlockItem key={item.id} item={item} />) : null}
            <BlockCreateButton />
          </div>
        );
    }
  };
  return (
    <div className="flex flex-col h-full bg-base-color-6 border-r border-gray-200">
      {/* 헤더 타이틀 */}
      <div className="px-6 pt-8 pb-4">
        <h2 className="text-xl font-semibold text-black">Vlock 라이브러리</h2>
      </div>

      {/* 탭 영역 (별도 컴포넌트) */}
      <BlockTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 검색 인풋 */}
      <div className="px-6 pb-4">
        <BlockSearchInput
          activeTab={activeTab}
          onSearch={() => {
            console.log('검색');
          }}
          {...inputProps}
        />
      </div>

      {/* 탭별 컨텐츠 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 px-6 pb-6">{content()}</div>
    </div>
  );
};

export default BlockSidebar;
