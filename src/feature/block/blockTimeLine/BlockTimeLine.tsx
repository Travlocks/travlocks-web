import type { Dispatch, SetStateAction } from 'react';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';
import { useShallow } from 'zustand/react/shallow';
import DayCard from './components/DayCard';
import RecommendCard from './components/RecommendCard';

interface BlockTimeLineProps {
  setLevel: Dispatch<SetStateAction<'timeline' | 'editor'>>;
}

const BlockTimeLine = ({ setLevel }: BlockTimeLineProps) => {
  const { tripDays, blocksByDay, setDay } = useBlockTemplateStore(
    useShallow((s) => ({
      tripDays: s.tripDays,
      blocksByDay: s.blocksByDay,
      setDay: s.setDay,
    })),
  );
  const dayCount = Math.max(0, tripDays);

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col">
      <div className="h-[79px] bg-base-color-6 border-b border-base-color py-[23px] px-[30px] flex items-center">
        <p className="h4">Timeline</p>
      </div>

      <div className="flex-1 py-[65px] px-[49px] flex gap-[40px] overflow-scroll min-h-[70dvh]">
        {Array.from({ length: dayCount }, (_, i) => (
          <DayCard
            key={i}
            day={i + 1}
            items={blocksByDay[i + 1] ?? []}
            onClick={() => {
              setLevel('editor');
              setDay(i + 1);
            }}
          />
        ))}
      </div>

      <RecommendCard />
    </div>
  );
};

export default BlockTimeLine;
