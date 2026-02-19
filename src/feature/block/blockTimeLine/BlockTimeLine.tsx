import type { Dispatch, SetStateAction } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useBlockEditor } from '../blockBuild/hooks/useBlockEditor';
import DayCard from './components/DayCard';
import RecommendCard from './components/RecommendCard';
import useGetTemplateDetail from './hooks/useQuery/useGetTemplateDetail';

interface BlockTimeLineProps {
  setLevel: Dispatch<SetStateAction<'timeline' | 'editor'>>;
}

const DAYS = {
  당일치기: 1,
  '1박 2일': 2,
  '2박 3일': 3,
  '3박 4일': 4,
  '4박 5일': 5,
} as const;

type TripDays = keyof typeof DAYS;

const BlockTimeLine = ({ setLevel }: BlockTimeLineProps) => {
  const { blocksByDay, actions } = useBlockEditor(); // 날짜별 블록
  const { templateId } = useParams();
  const location = useLocation();

  const { data } = useGetTemplateDetail(Number(templateId));

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] flex flex-col">
      <div className="h-[79px] bg-base-color-6 border-b border-base-color py-[23px] px-[30px] flex items-center">
        <p className="h4">Timeline</p>
      </div>

      <div className="flex-1 py-[65px] px-[49px] flex gap-[40px] overflow-scroll min-h-[70dvh]">
        {data &&
          Array.from({ length: location?.state?.data?.dayCount || DAYS[data.data.tripDays as TripDays] }, (_, i) => (
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
