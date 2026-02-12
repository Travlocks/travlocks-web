import clsx from 'clsx';
import Free from '@assets/preference/icon-preference-style-free.svg?react';
import Plan from '@assets/preference/icon-preference-style-plan.svg?react';
import Schedule from '@assets/preference/icon-preference-style-schedule.svg?react';
import Efficiency from '@assets/preference/icon-preference-style-efficiency.svg?react';
import Improvise from '@assets/preference/icon-preference-style-imporvise.svg?react';
import Stay from '@assets/preference/icon-preference-style-stay.svg?react';
import StyleCard from './StyleCard';

export type TravelStyle = 'free' | 'healing' | 'food' | 'activity' | 'accommodation' | 'other';

interface TravelStyleSectionProps {
  selectedStyles: TravelStyle[];
  onToggleStyle: (style: TravelStyle) => void;
  className?: string;
}

const travelStyleOptions: { id: TravelStyle; icon: React.ReactNode; label: string }[] = [
  { id: 'free', icon: <Free className="w-full h-full" />, label: '자유 계획형' },
  { id: 'healing', icon: <Plan className="w-full h-full" />, label: '계획 충실형' },
  { id: 'food', icon: <Schedule className="w-full h-full" />, label: '느긋한 일정형' },
  { id: 'other', icon: <Efficiency className="w-full h-full" />, label: '효율 중시형' },
  { id: 'activity', icon: <Improvise className="w-full h-full" />, label: '즉흥 탐색형' },
  { id: 'accommodation', icon: <Stay className="w-full h-full" />, label: '숙소 중심형' },
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
