import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import TemplateAnimation from '../assets/template.lottie';
import PuzzleIcon from '@assets/draft/icon-draft-puzzle.svg?react';
// import SearchBar from '@/feature/search/component/SearchBar';

const TemplateHeader = () => {
  return (
    <div className="relative bg-base-color-5 flex flex-col justify-center h-[483px] w-full z-above px-[20px]">
      <div className="flex flex-col items-center gap-[60px] relative z-above">
        <div className="flex flex-col items-center gap-[40px] text-center">
          <p className="text-base-color-1 h5">다른 여행자들의 블록을 탐색하고 내 블록으로 리믹스해요!</p>
          <h1 className="text-[60px] font-[600] leading-[60px]">템플릿 탐색</h1>
        </div>

        {/* <SearchBar onSearch={onSearch} placeholder="어디로 떠나고 싶으신가요?" /> */}
      </div>

      <DotLottieReact src={TemplateAnimation} loop autoplay className="absolute inset-0 pointer-events-none" />

      <PuzzleIcon className="absolute bottom-[-33px] left-[61px] size-[80px] rotate-[190deg]" />
      <PuzzleIcon className="absolute top-[103px] right-[338px] size-[80px] rotate-[60deg]" />
      <PuzzleIcon className="absolute top-[219px] right-[28px] size-[130px] rotate-[10deg]" />
    </div>
  );
};

export default TemplateHeader;
