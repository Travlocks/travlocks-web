import { useLocation, useParams } from 'react-router-dom';

import useGetRecommendAIVloks from '../hooks/useQuery/useGetRecommendAIVloks';
import useGetMyPage from '@/feature/user/hooks/queries/useGetMypage';
import BlockItemUI from '@/shared/components/Block/BlockItemUI';

import RefreshIcon from '@assets/block/icon-refresh.svg?react';
import convertIdToCity from '../utils/convertIdToCity';

const RecommendCard = () => {
  const { data: userData } = useGetMyPage();
  const { templateId } = useParams();

  const location = useLocation();
  const city = convertIdToCity(location.state.destinationCityIds[0]);

  const { data, refetch } = useGetRecommendAIVloks(Number(templateId));

  return (
    <div className="bg-white py-[25px] px-[30px] flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[4px]">
        <div className="flex justify-between">
          <p className="h8">{userData?.data.nickname}님을 위한 AI 장소 추천</p>

          <div
            onClick={() => refetch()}
            className="rounded-full size-[22px] border border-base-color bg-white flex justify-center items-center cursor-pointer">
            <RefreshIcon />
          </div>
        </div>

        <p className="b6">{city}에서 놓칠 수 없는 순간들! 많은 여행자들이 이 블록들을 조립했어요.</p>
      </div>

      <div className="flex gap-[20px]">
        {data?.data.vlocks.map((item) => (
          <BlockItemUI key={item.vlockId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecommendCard;
