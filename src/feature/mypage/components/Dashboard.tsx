import PuzzleIcon from '@/shared/assets/icon-puzzle.svg?react';
import StarIcon from '@/shared/assets/icon-star.svg?react';
import TemplateIcon from '@/shared/assets/icon-template.svg?react';
import ActivityList from './ActivityList';
import ProfileHeader from './ProfileHeader';
import SectionHeader from './SectionHeader';
import SettingsSection from './SettingsSection';
import StatusCard from './StatusCard';
import { useMyPageQuery } from '../hooks/useMyPageQuery';
import type { VlockDto, CreatedTemplateDto } from '../types/mypage.type';

// Vlock을 ActivityList 형식으로 변환
const formatVlockForActivity = (vlock: VlockDto) => ({
  id: String(vlock.vlockId),
  title: vlock.name,
  location: vlock.city,
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
  title: template.title,
  description: template.city,
  isFavorite: template.isFavorite,
});

const Dashboard = () => {
  const { data: myPageData, isLoading, isError } = useMyPageQuery();

  // TODO: /templates/{templateId}/favorite
  const handleToggleFavorite = (id: string) => {
    console.log('Toggle favorite for template:', id);
  };

  if (isLoading) {
    return <div className="px-6 py-12 text-center">로딩 중...</div>;
  }

  if (isError || !myPageData) {
    return <div className="px-6 py-12 text-center text-red-500">데이터를 불러오는데 실패했습니다.</div>;
  }

  const recentVlocks = myPageData.recent.createdVlocks.map(formatVlockForActivity);

  return (
    <div className="px-6 py-12">
      <ProfileHeader />
      <div className="flex gap-5">
        <StatusCard icon={<PuzzleIcon />} label="Vlocks" count={myPageData.counts.vlockCount} />
        <StatusCard icon={<TemplateIcon />} label="템플릿" count={myPageData.counts.templateCount} />
        <StatusCard icon={<StarIcon />} label="즐겨찾기" count={myPageData.counts.starCount} />
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
            sectionTitle="최근 사용한 탬플릿"
            activities={myPageData.recent.createdTemplates.map(formatTemplateForActivity)}
            showStar
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>

      <div className="mt-20">
        <SettingsSection
          initialNickname={myPageData.nickname}
          email="your@email.com"
          initialBio={myPageData.introduction || ''}
          onSave={(data) => console.log('Settings saved:', data)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
