import { useState } from 'react';
import { MOCK_BLOCKS } from '../../blockBuild/mock';
import RefreshIcon from '@assets/block/icon-refresh.svg?react';
import BlockItemUI from '@/shared/components/Block/BlockItemUI';

// 연결 전 목데이터에서 랜덤으로 보여줌
const getRandom = () => {
  const arr = [...MOCK_BLOCKS];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.slice(0, 3);
};

const RecommendCard = () => {
  const [randomArr, setRandomArr] = useState(getRandom());

  return (
    <div className="bg-white py-[25px] px-[30px] flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[4px]">
        <div className="flex justify-between">
          <p className="h8">디모님을 위한 AI 장소 추천</p>

          <div
            onClick={() => setRandomArr(() => getRandom())}
            className="rounded-full size-[22px] border border-base-color bg-white flex justify-center items-center cursor-pointer">
            <RefreshIcon />
          </div>
        </div>

        <p className="b6">제주에서 놓칠 수 없는 순간들! 많은 여행자들이 이 블록들을 조립했어요.</p>
      </div>

      <div className="flex gap-[20px]">
        {randomArr.map((item) => (
          <BlockItemUI key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecommendCard;
