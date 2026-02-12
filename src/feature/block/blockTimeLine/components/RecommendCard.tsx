import RefreshIcon from '@assets/block/icon-refresh.svg?react';
import BlockItemUI from '@/shared/components/Block/BlockItemUI';
import useGetRecommendAIVloks from '../hooks/useQuery/useGetRecommendAIVloks';
import useGetMyPage from '@/feature/user/hooks/queries/useGetMypage';

const RecommendCard = () => {
  const { data: userData } = useGetMyPage();

  // TODO: 템플릿 사전 정보 입력 시 받는 템플릿 id로 연결해야 함
  const { data, refetch } = useGetRecommendAIVloks(41);

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

        <p className="b6">제주에서 놓칠 수 없는 순간들! 많은 여행자들이 이 블록들을 조립했어요.</p>
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
