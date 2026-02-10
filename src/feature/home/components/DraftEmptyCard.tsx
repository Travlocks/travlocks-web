import RoundButton from '@/shared/components/Button/RoundButton';
import Character from '@assets/draft/icon-draft-character.svg?react';
import PuzzleIcon from '@assets/draft/icon-draft-puzzle.svg?react';
import { useNavigate } from 'react-router-dom';

const DraftEmptyCard = () => {
  const navigate = useNavigate();

  return (
    <div className="group max-w-[1218px] w-full h-[452px] rounded-[30px] border-base-color bg-white flex flex-col justify-center items-center gap-[28px] relative overflow-hidden">
      <Character className="relative z-above" />

      <div className="flex flex-col gap-[8px] text-center z-above relative">
        <p className="h6">아직 여행이 시작되지 않았어요</p>
        <p className="b3 text-base-color-3">첫 블록을 쌓아 여행을 시작해볼까요?</p>
      </div>

      <RoundButton text="여행 조립하러 떠나기" width={292} hover onClick={() => navigate('/block')} />

      {/* 애니메이션 */}
      <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-0 duration-800 ease transition">
        <PuzzleIcon className="absolute top-[30px] left-[135px] size-[81px]" />
        <PuzzleIcon className="absolute top-[169px] left-[263px] rotate-[-90deg] w-[100px] h-[81px]" />
        <PuzzleIcon className="absolute top-[264px] left-[70px] rotate-[70deg] w-[70px] h-[57px] " />
      </div>

      <div className="absolute inset-0 translate-x-[100%] group-hover:translate-x-0 duration-800 ease transition">
        <PuzzleIcon className="absolute top-[30px] right-[115px] rotate-[180deg] w-[70px] h-[57px]" />
        <PuzzleIcon className="absolute top-[251px] right-[260px] rotate-[65deg] w-[100px] h-[81px]" />
      </div>
    </div>
  );
};

export default DraftEmptyCard;
