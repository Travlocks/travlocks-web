import clsx from 'clsx';
import TreeIcon from '@/shared/assets/icon-tree.svg?react';
import BuildingIcon from '@/shared/assets/icon-building.svg?react';
import UtensilsIcon from '@/shared/assets/icon-utensils.svg?react';
import ActivityIcon from '@/shared/assets/icon-activity.svg?react';
import StyleCard from './StyleCard';

export type TravelStyle = 'free' | 'healing' | 'food' | 'activity' | 'accommodation' | 'other';

interface TravelStyleSectionProps {
  selectedStyles: TravelStyle[];
  onToggleStyle: (style: TravelStyle) => void;
  className?: string;
}

const travelStyleOptions: { id: TravelStyle; icon: React.ReactNode; label: string }[] = [
  { id: 'free', icon: <TreeIcon className="w-full h-full" />, label: '자유 여행' },
  { id: 'healing', icon: <BuildingIcon className="w-full h-full" />, label: '힐링 · 여유 중심' },
  { id: 'food', icon: <UtensilsIcon className="w-full h-full" />, label: '맛집 · 로컬 중심' },
  { id: 'other', icon: <UtensilsIcon className="w-full h-full" />, label: '기타' },
  { id: 'activity', icon: <ActivityIcon className="w-full h-full" />, label: '액티비티 중심' },
  { id: 'accommodation', icon: <BuildingIcon className="w-full h-full" />, label: '숙소 중심' },
];

const TravelStyleSection = ({ selectedStyles, onToggleStyle, className }: TravelStyleSectionProps) => {
  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <h4 className="h10 text-base-color-0">여행 스타일</h4>
      <div className="grid grid-cols-3 gap-5">
        {travelStyleOptions.map((option) => (
          <StyleCard
            key={option.id}
            icon={option.icon}
            label={option.label}
            isSelected={selectedStyles.includes(option.id)}
            onClick={() => onToggleStyle(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TravelStyleSection;
