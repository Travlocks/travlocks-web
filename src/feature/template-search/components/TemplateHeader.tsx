import { useState } from 'react';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import TemplateAnimation from '../assets/template.lottie';
import SearchIcon from '../assets/icon-search.svg?react';
import PuzzleIcon from '@assets/draft/icon-draft-puzzle.svg?react';

const TemplateHeader = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <div className="relative bg-base-color-5 flex flex-col justify-center h-[483px] w-full relative z-10 px-[20px]">
      <div className="flex flex-col items-center gap-[60px] relative z-10">
        <div className="flex flex-col items-center gap-[40px] text-center">
          <p className="text-base-color-1 h5">다른 여행자들의 블록을 탐색하고 내 블록으로 리믹스해요!</p>
          <h1 className="text-[60px] font-[600] leading-[60px]">템플릿 탐색</h1>
        </div>

        <div className="flex gap-[16px] items-center max-w-[1131px] w-full rounded-[30px] border border-base-color bg-white py-[32px] px-[40px]">
          <SearchIcon />
          <input
            placeholder="어디로 떠나고 싶으신가요?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none placeholder-['Pretendard'] placeholder:font-base-color-3 placeholder:text-[30px] placeholder:font-medium text-[30px] leading-[36px]"
          />
        </div>
      </div>

      <div className="flex justify-center absolute inset-0 mx-auto">
        <DotLottieReact src={TemplateAnimation} loop autoplay className="mx-auto absolute inset-0" />
      </div>

      <PuzzleIcon className="absolute bottom-[-33px] left-[61px] size-[80px] rotate-190" />
      <PuzzleIcon className="absolute top-[103px] right-[338px] size-[80px] rotate-60" />
      <PuzzleIcon className="absolute top-[219px] right-[28px] size-[130px] rotate-10" />
    </div>
  );
};

export default TemplateHeader;
