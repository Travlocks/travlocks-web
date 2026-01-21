import clsx from 'clsx';
import TreeIcon from '@/shared/assets/icon-tree.svg?react';
import BuildingIcon from '@/shared/assets/icon-building.svg?react';
import UtensilsIcon from '@/shared/assets/icon-utensils.svg?react';
import ActivityIcon from '@/shared/assets/icon-activity.svg?react';
import StyleCard from './StyleCard';

export type InterestTheme = 'nature' | 'culture' | 'food' | 'healing' | 'activity' | 'local';

interface InterestThemeSectionProps {
  selectedThemes: InterestTheme[];
  onToggleTheme: (theme: InterestTheme) => void;
  className?: string;
}

const interestThemeOptions: { id: InterestTheme; icon: React.ReactNode; label: string }[] = [
  { id: 'nature', icon: <TreeIcon className="w-full h-full" />, label: '자연' },
  { id: 'culture', icon: <BuildingIcon className="w-full h-full" />, label: '문화' },
  { id: 'food', icon: <UtensilsIcon className="w-full h-full" />, label: '맛집' },
  { id: 'healing', icon: <ActivityIcon className="w-full h-full" />, label: '힐링' },
  { id: 'activity', icon: <ActivityIcon className="w-full h-full" />, label: '문화' },
  { id: 'local', icon: <BuildingIcon className="w-full h-full" />, label: '맛집' },
];

const InterestThemeSection = ({ selectedThemes, onToggleTheme, className }: InterestThemeSectionProps) => {
  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <h4 className="h10 text-base-color-0">관심 테마</h4>
      <div className="grid grid-cols-3 gap-5">
        {interestThemeOptions.map((option) => (
          <StyleCard
            key={option.id}
            icon={option.icon}
            label={option.label}
            isSelected={selectedThemes.includes(option.id)}
            onClick={() => onToggleTheme(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default InterestThemeSection;
