import clsx from 'clsx';
import TreeIcon from '@assets/preference/icon-preference-nature.svg?react';
import BuildingIcon from '@assets/preference/icon-preference-culture.svg?react';
import LocalIcon from '@assets/preference/icon-preference-local.svg?react';
import UtensilsIcon from '@assets/preference/icon-preference-food.svg?react';
import HealingIcon from '@assets/preference/icon-preference-healing.svg?react';
import ActivityIcon from '@assets/preference/icon-preference-activity.svg?react';
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
  { id: 'healing', icon: <HealingIcon className="w-full h-full" />, label: '힐링' },
  { id: 'activity', icon: <ActivityIcon className="w-full h-full" />, label: '액티비티' },
  { id: 'local', icon: <LocalIcon className="w-full h-full" />, label: '로컬' },
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
