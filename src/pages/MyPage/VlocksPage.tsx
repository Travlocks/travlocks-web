import { useMyPageQuery } from '@/feature/mypage/hooks/useMyPageQuery';
import { useCreatedBlocks } from '@/feature/block/blockBuild/hooks/queries/useBlockList';
import type { CategoryBlock } from '@/feature/block/blockBuild/types/blockCategory.types';
import type { CategoryType, SidebarBlock } from '@/feature/block/blockBuild/types/block';
import ProfileLayout from '@/feature/mypage/components/ProfileLayout';
import BlockItemUI from '@/shared/components/Block/BlockItemUI';

const DEFAULT_CITY_ID = 101;

const CATEGORY_TYPES = ['숙소', '식당', '카페', '쇼핑', '관광지', '문화', '액티비티', '투어', '기타'] as const;

const convertStayDuration = (stayHours?: number) => {
  if (typeof stayHours === 'number') {
    return `${stayHours} 시간`;
  }

  return '1 시간';
};

const toCategoryType = (categoryName: string): CategoryType => {
  return CATEGORY_TYPES.includes(categoryName as CategoryType) ? (categoryName as CategoryType) : '기타';
};

const toSidebarBlock = (block: CategoryBlock): SidebarBlock => ({
  id: block.id,
  name: block.name,
  category: toCategoryType(block.vlockCategory.name),
  duration: convertStayDuration(block.vlockCategory.stayHours),
  imageUrl: block.coverImgUrl,
});

const VlocksPage = () => {
  const { data: myPageData, isLoading: isProfileLoading, isError: isProfileError } = useMyPageQuery();
  const {
    data: vlockData,
    isLoading: isVlockLoading,
    isError: isVlockError,
  } = useCreatedBlocks({
    cityId: DEFAULT_CITY_ID,
  });

  const vlocks = (vlockData?.data ?? []).map(toSidebarBlock);

  if (isProfileLoading || isVlockLoading) {
    return <div className="px-6 py-12 text-center">로딩 중...</div>;
  }

  if (isProfileError || isVlockError || !myPageData) {
    return <div className="px-6 py-12 text-center text-red-500">데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ProfileLayout
      nickname={myPageData.nickname}
      introduction={myPageData.introduction}
      profileImageUrl={myPageData.profileImageUrl}
      title={`${myPageData.nickname} 님이 생성한 Vlocks`}
      description={`${myPageData.nickname}님이 생성한 Vlocks 입니다. 블록을 조립해 새 여행을 계획해보세요.`}
      children={
        vlocks.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-[42px] gap-y-[20px] sm:grid-cols-2 lg:grid-cols-3">
            {vlocks.map((vlock) => (
              <BlockItemUI key={vlock.id} item={vlock} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-base-color-1">생성한 Vlock가 없습니다.</p>
        )
      }
    />
  );
};

export default VlocksPage;
