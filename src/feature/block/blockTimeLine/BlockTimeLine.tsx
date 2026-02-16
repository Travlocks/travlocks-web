import type { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';

import { useBlockEditor } from '../blockBuild/hooks/useBlockEditor';
import DayCard from './components/DayCard';
import RecommendCard from './components/RecommendCard';

interface BlockTimeLineProps {
  setLevel: Dispatch<SetStateAction<'timeline' | 'editor'>>;
}

const BlockTimeLine = ({ setLevel }: BlockTimeLineProps) => {
  const { blocksByDay, actions } = useBlockEditor(); // 날짜별 블록
  const location = useLocation();

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col">
      <div className="h-[79px] bg-base-color-6 border-b border-base-color py-[23px] px-[30px] flex items-center">
        <p className="h4">Timeline</p>
      </div>

      <div className="flex-1 py-[65px] px-[49px] flex gap-[40px] overflow-scroll min-h-[70dvh]">
        {Array.from({ length: location.state.data.dayCount }, (_, i) => (
          <DayCard
            key={i}
            day={i + 1}
            items={blocksByDay[i + 1]}
            onClick={() => {
              setLevel('editor');
              actions.setDay(i + 1);
            }}
          />
        ))}
      </div>

      <RecommendCard />
    </div>
  );
};

export default BlockTimeLine;
