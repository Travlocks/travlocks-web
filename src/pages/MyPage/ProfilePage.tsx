import { Link } from 'react-router-dom';
import ArrowRightIcon from '@assets/icon-arrow-right.svg?react';
import mainBackgroundUrl from '@/shared/assets/backgrounds/mainBg.svg';
import { REGION_MAP, type RegionId } from '@/shared/constants/destinationCity';
import ActivityCard from '@/feature/mypage/components/ActivityCard';
import ProfileListContainer from '@/feature/mypage/components/ProfileListContainer';
import { useMyPageQuery } from '@/feature/mypage/hooks/useMyPageQuery';
import type { VlockDto } from '@/feature/mypage/types/mypage.type';

const getRegionName = (regionId: number) => REGION_MAP[regionId as RegionId]?.name.korean ?? '지역 정보 없음';

const formatVlockForCard = (vlock: VlockDto) => ({
  id: String(vlock.vlockId),
  title: vlock.vlockName,
  location: getRegionName(vlock.regionId),
  date:
    new Date(vlock.createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }) + ' 수정됨',
});

const ProfilePage = () => {
  const { data: myPageData, isLoading, isError } = useMyPageQuery();

  if (isLoading) {
    return <div className="px-6 py-12 text-center">로딩 중...</div>;
  }

  if (isError || !myPageData) {
    return <div className="px-6 py-12 text-center text-red-500">데이터를 불러오는데 실패했습니다.</div>;
  }

  const vlockCards = myPageData.recent.myPageRecentVlocks.map(formatVlockForCard);
  const isEmpty = vlockCards.length === 0;

  return (
    <div className="min-h-dvh bg-white">
      <div className="relative h-[280px] overflow-hidden bg-[#9FCDFF]">
        <img
          src={mainBackgroundUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        <div className="relative mx-auto w-full max-w-300 px-6 pt-10">
          <Link
            to="/mypage"
            className="inline-flex h-[52px] items-center rounded-[15px] bg-white/95 pl-2 pr-[18px] shadow-[0_8px_24px_rgba(74,85,105,0.12)] backdrop-blur-sm">
            <ArrowRightIcon className="h-[31px] w-[27px] rotate-180 text-base-color-1" fill="#4A5569" />
            <span className="pl-1.5 text-2xl font-medium leading-none text-base-color-1">마이페이지로 돌아가기</span>
          </Link>
        </div>
      </div>

      <div className="relative z-10 w-full bg-white">
        <div className="mx-auto w-full max-w-300 px-6 pb-16">
          <div className="relative pt-0">
            <div className="absolute left-0 top-0 flex w-[242px] aspect-square -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-8 border-white bg-base-color-4 shadow-[0_10px_24px_rgba(74,85,105,0.18)]">
              {myPageData.profileImageUrl ? (
                <img
                  src={myPageData.profileImageUrl}
                  alt={`${myPageData.nickname} 프로필 이미지`}
                  className="h-full w-full"
                />
              ) : (
                <div className="h-full w-full bg-base-color-4" />
              )}
            </div>
            <div className="ml-[282px] flex flex-col justify-start pt-3 text-left">
              <h1 className="h1 text-base-color-0">{myPageData.nickname}</h1>
              <p className="b2 text-base-color-1">{myPageData.introduction || '소개가 없습니다.'}</p>
            </div>
          </div>

          <div className="mt-14">
            <ProfileListContainer
              title={`${myPageData.nickname} 님이 생성한 Vlocks`}
              description={`${myPageData.nickname}님이 생성한 Vlocks 입니다. 블록을 조립해 새 여행을 계획해보세요.`}>
              {isEmpty ? (
                <div className="rounded-[12px] bg-base-color-5 px-6 py-8 text-center b3 text-base-color-1">
                  아직 생성한 Vlocks가 없어요.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {vlockCards.map((vlock) => (
                    <ActivityCard
                      key={vlock.id}
                      title={vlock.title}
                      location={vlock.location}
                      date={vlock.date}
                      className="h-full"
                    />
                  ))}
                </div>
              )}
            </ProfileListContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
