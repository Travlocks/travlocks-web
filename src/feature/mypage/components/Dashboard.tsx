import { useState } from 'react';
import PuzzleIcon from '@/shared/assets/icon-puzzle.svg?react';
import StarIcon from '@/shared/assets/icon-star.svg?react';
import TemplateIcon from '@/shared/assets/icon-template.svg?react';
import ActivityList from './ActivityList';
import ProfileHeader from './ProfileHeader';
import StatusCard from './StatusCard';

const recentlyCreatedBlocks = [
  {
    id: '1',
    title: '제주도 3박 4일 여행',
    location: '부산',
    date: '2025.12.28 수정됨',
  },
  {
    id: '2',
    title: '부산 먹방 코스',
    location: '부산',
    date: '2025.12.20 수정됨',
  },
  {
    id: '3',
    title: '강릉 겨울 바다',
    location: '강릉',
    date: '2025.12.15 수정됨',
  },
  {
    id: '4',
    title: '춘천 주말 여행',
    location: '춘천',
    date: '2025.12.02 수정됨',
  },
];

const initialTemplates = [
  {
    id: '5',
    title: '제주도 렌트카 여행 템플릿',
    description: '주차 가능한 여행지 추천 모음',
    isFavorite: false,
  },
  {
    id: '6',
    title: '2박 3일 서울 가족여행',
    description: '부모님 모시고 가기 좋은 코스',
    isFavorite: true,
  },
  {
    id: '7',
    title: '유럽 배낭여행 체크리스트',
    description: '필수 준비물부터 생활 꿀팁까지',
    isFavorite: false,
  },
  {
    id: '8',
    title: '국내 캠핑 준비물',
    description: '초보 캠핑러를 위한 가이드',
    isFavorite: false,
  },
];

const Dashboard = () => {
  const [templates, setTemplates] = useState(initialTemplates);

  const handleToggleFavorite = (id: string) => {
    setTemplates((prev) =>
      prev.map((template) => (template.id === id ? { ...template, isFavorite: !template.isFavorite } : template)),
    );
  };

  return (
    <div className="px-6 py-12">
      <ProfileHeader />
      <div className="flex gap-5">
        <StatusCard icon={<PuzzleIcon />} label="Vlocks" count={24} />
        <StatusCard icon={<TemplateIcon />} label="템플릿" count={8} />
        <StatusCard icon={<StarIcon />} label="즐겨찾기" count={12} />
      </div>

      <div className="flex items-center gap-3 mt-12">
        <div className="w-2 h-11 bg-primary-color rounded-sm" />
        <h2 className="h2 text-base-color-0">최근 활동</h2>
      </div>

      <div className="flex gap-5 mt-7">
        <div className="flex-1">
          <ActivityList sectionTitle="최근 생성 블록" activities={recentlyCreatedBlocks} />
        </div>
        <div className="flex-1">
          <ActivityList
            sectionTitle="최근 사용한 탬플릿"
            activities={templates}
            showStar
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
