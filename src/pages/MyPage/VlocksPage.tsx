import { useMyPageQuery } from '@/feature/mypage/hooks/useMyPageQuery';
import { useCreatedBlocks } from '@/feature/block/blockBuild/hooks/queries/useBlockList';
import ProfileLayout from '@/feature/mypage/components/ProfileLayout';

const DEFAULT_CITY_ID = 101;

const VlocksPage = () => {
  const { data: myPageData, isLoading: isProfileLoading, isError: isProfileError } = useMyPageQuery();
  const {
    data: vlockData,
    isLoading: isVlockLoading,
    isError: isVlockError,
  } = useCreatedBlocks({
    cityId: DEFAULT_CITY_ID,
  });
  void vlockData;

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
      children={null}>
      {/* TODO: /mypage/vlocks 목록 API 연동 후 Vlocks 리스트 렌더링 구현 */}
      {/* TODO: 현재 슬롯은 비우고 레이아웃만 유지 */}
    </ProfileLayout>
  );
};

export default VlocksPage;
