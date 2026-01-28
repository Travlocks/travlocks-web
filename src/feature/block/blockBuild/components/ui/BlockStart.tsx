import PlaneIcon from '@assets/block/icon-plane.svg?react';
import DotsIcon from '@assets/block/icon-dots.svg?react';

interface BlockStartProps {
  className?: string;
}

const BlockStart = ({ className }: BlockStartProps) => {
  return (
    <div
      className={`relative w-[186px] h-[87px] rounded-[10px] overflow-hidden bg-gradient-color-hover ${className || ''}`}>
      {/* 비행기 아이콘 */}
      <div className="absolute left-[30px] top-[33px] w-[30px] h-[25px]">
        <PlaneIcon className="w-full h-full" />
      </div>

      {/* 텍스트 영역 */}
      <div className="absolute left-[70px] top-[30px] flex flex-col">
        <span className="text-[12px] font-medium leading-[14.32px] text-base-color-6">여행시작</span>
        <span className="text-[15px] font-semibold leading-[17.9px] text-base-color-6 mt-px">출발</span>
      </div>

      {/* 움직이는바 아이콘 */}
      <div className="absolute right-[19px] top-[28px] w-[30px] h-[30px]">
        <DotsIcon className="w-full h-full" />
      </div>
    </div>
  );
};

export default BlockStart;
