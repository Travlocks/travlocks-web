import PuzzleIcon from '@/shared/assets/icon-puzzle.svg?react';
import StarIcon from '@/shared/assets/icon-star.svg?react';
import TemplateIcon from '@/shared/assets/icon-template.svg?react';
import { REGION_MAP, type RegionId } from '@/shared/constants/destinationCity';
import { toast } from '@/shared/stores/toastStore';
import { useNavigate } from 'react-router-dom';
import ActivityList from './ActivityList';
import type { InterestTheme } from './InterestThemeSection';
import ProfileHeader from './ProfileHeader';
import SectionHeader from './SectionHeader';
import SettingsSection from './SettingsSection';
import StatusCard from './StatusCard';
import type { TravelStyle } from './TravelStyleSection';
import { useMyPageQuery } from '../hooks/useMyPageQuery';
import { useFavoriteMutation } from '../hooks/useFavoriteMutation';
import { useUpdateMyProfileMutation } from '../hooks/useUpdateMyProfileMutation';
import type { VlockDto, CreatedTemplateDto } from '../types/mypage.type';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';

const getRegionName = (regionId: number) => REGION_MAP[regionId as RegionId]?.name.korean ?? '지역 정보 없음';

// Vlock을 ActivityList 형식으로 변환
const formatVlockForActivity = (vlock: VlockDto) => ({
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

// Template을 ActivityList 형식으로 변환
const formatTemplateForActivity = (template: CreatedTemplateDto) => ({
  id: String(template.templateId),
  title: template.templateTitle,
  description: getRegionName(template.regionId),
  isFavorite: template.favorite,
});

const TRAVEL_STYLE_TO_ID: Record<TravelStyle, number> = {
  free: 1,
  healing: 2,
  food: 3,
  other: 4,
  activity: 5,
  accommodation: 6,
};

const TRAVEL_STYLE_ID_TO_KEY: Partial<Record<number, TravelStyle>> = {
  1: 'free',
  2: 'healing',
  3: 'food',
  4: 'other',
  5: 'activity',
  6: 'accommodation',
};

const INTEREST_THEME_TO_ID: Record<InterestTheme, number> = {
  nature: 1,
  culture: 2,
  food: 3,
  healing: 4,
  activity: 5,
  local: 6,
};

const INTEREST_THEME_ID_TO_KEY: Partial<Record<number, InterestTheme>> = {
  1: 'nature',
  2: 'culture',
  3: 'food',
  4: 'healing',
  5: 'activity',
  6: 'local',
};

const toTravelStyleKeys = (styleIds: number[]): TravelStyle[] => {
  return styleIds
    .map((styleId) => TRAVEL_STYLE_ID_TO_KEY[styleId])
    .filter((style): style is TravelStyle => style !== undefined);
};

const toInterestThemeKeys = (themeIds: number[]): InterestTheme[] => {
  return themeIds
    .map((themeId) => INTEREST_THEME_ID_TO_KEY[themeId])
    .filter((theme): theme is InterestTheme => theme !== undefined);
};

const toTravelStyleIds = (styles: TravelStyle[]): number[] => {
  return [...new Set(styles.map((style) => TRAVEL_STYLE_TO_ID[style]))];
};

const toInterestThemeIds = (themes: InterestTheme[]): number[] => {
  return [...new Set(themes.map((theme) => INTEREST_THEME_TO_ID[theme]))];
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: myPageData, isLoading, isError } = useMyPageQuery();
  const { toggleFavorite } = useFavoriteMutation();
  const { updateMyProfile, isPending: isProfileUpdating } = useUpdateMyProfileMutation({
    onSuccess: () => {
      toast.success('변경사항이 저장되었습니다.', 'bottom-center');
    },
    onError: (error) => {
      console.error('Failed to save settings:', error);
      toast.error(error.message, 'bottom-center');
    },
  });

  const handleToggleFavorite = (id: string) => {
    const recentTemplates = myPageData?.recent.myPageRecentTemplates ?? [];
    const template = recentTemplates.find((t) => t.templateId === Number(id));
    if (template) {
      toggleFavorite(template.templateId, template.favorite);
    }
  };

  const handleSaveSettings = (data: {
    nickname: string;
    bio: string;
    travelStyles: TravelStyle[];
    interestThemes: InterestTheme[];
  }) => {
    updateMyProfile({
      nickname: data.nickname,
      introduction: data.bio,
      preferredTravelStyleIds: toTravelStyleIds(data.travelStyles),
      preferredTravelThemeIds: toInterestThemeIds(data.interestThemes),
    });
  };

  const handleTemplateClick = (id: string) => {
    /**
     * 온보딩 진입 흐름과 동일하게 템플릿 ID를 선동기화합니다.
     *
     * @remarks
     * - 최근 사용 템플릿 클릭 후 `/block/:id`로 이동하기 전에 store.templateId를 먼저 반영합니다.
     * - 템플릿이 바뀌는 순간의 store 초기화 타이밍을 일정하게 맞춰
     *   화면 전환 시 컨텍스트 불일치를 줄입니다.
     */
    useBlockTemplateStore.getState().setTemplateId(String(id));
    navigate(`/block/${id}`);
  };

  if (isLoading) {
    return <div className="px-6 py-12 text-center">로딩 중...</div>;
  }

  if (isError || !myPageData) {
    return <div className="px-6 py-12 text-center text-red-500">데이터를 불러오는데 실패했습니다.</div>;
  }

  const recentVlockSource = myPageData.recent.myPageRecentVlocks;
  const recentTemplateSource = myPageData.recent.myPageRecentTemplates;
  const recentVlocks = recentVlockSource.map(formatVlockForActivity);

  return (
    <div className="px-6 py-12">
      <ProfileHeader
        nickname={myPageData.nickname}
        introduction={myPageData.introduction}
        profileImageUrl={myPageData.profileImageUrl}
      />
      <div className="flex gap-5">
        <StatusCard
          icon={<PuzzleIcon />}
          label="Vlocks"
          count={myPageData.counts.vlockCount}
          onClick={() => navigate('/mypage/vlocks')}
        />
        <StatusCard
          icon={<TemplateIcon />}
          label="템플릿"
          count={myPageData.counts.templateCount}
          onClick={() => navigate('/mypage/templates')}
        />
        <StatusCard
          icon={<StarIcon />}
          label="즐겨찾기"
          count={myPageData.counts.starCount}
          onClick={() => navigate('/mypage/templates?filter=favorite')}
        />
      </div>

      <div className="mt-20">
        <SectionHeader title="최근 활동" />
      </div>

      <div className="flex gap-5 mt-7">
        <div className="flex-1">
          <ActivityList sectionTitle="최근 생성 블록" activities={recentVlocks} />
        </div>
        <div className="flex-1">
          <ActivityList
            sectionTitle="최근 사용한 템플릿"
            activities={recentTemplateSource.map(formatTemplateForActivity)}
            showStar
            onToggleFavorite={handleToggleFavorite}
            onActivityClick={handleTemplateClick}
          />
        </div>
      </div>

      <div className="mt-20">
        <SettingsSection
          initialNickname={myPageData.nickname}
          email={myPageData.email}
          initialBio={myPageData.introduction || ''}
          initialTravelStyles={toTravelStyleKeys(myPageData.preferredTravelStyleIds)}
          initialInterestThemes={toInterestThemeKeys(myPageData.preferredTravelThemeIds)}
          isSaving={isProfileUpdating}
          onSave={handleSaveSettings}
        />
      </div>
    </div>
  );
};

export default Dashboard;
