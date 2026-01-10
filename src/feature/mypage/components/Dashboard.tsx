import PuzzleIcon from '@/shared/assets/icon-puzzle.svg?react';
import StarIcon from '@/shared/assets/icon-star.svg?react';
import TemplateIcon from '@/shared/assets/icon-template.svg?react';
import ProfileHeader from './ProfileHeader';
import StatusCard from './StatusCard';

const Dashboard = () => {
  return (
    <div className="px-6 py-12">
      <ProfileHeader />
      <div className="flex gap-5">
        <StatusCard icon={<PuzzleIcon />} label="Vlocks" count={24} />
        <StatusCard icon={<TemplateIcon />} label="템플릿" count={8} />
        <StatusCard icon={<StarIcon />} label="즐겨찾기" count={12} />
      </div>
    </div>
  );
};

export default Dashboard;
