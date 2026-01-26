import { IconBase } from '@/shared/ui/icon/IconBase';
import TriangleIcon from '@assets/blockEdit/icon-triangle.svg?react';
import clsx from 'clsx';

const BlockEditorContent = () => {
  return (
    <div className="flex flex-col w-full h-full bg-[#F8FAFC]">
      {/* 1. 상단 헤더 */}
      <div className="h-[79px] shrink-0 bg-white border-b border-[#D9D9D9] flex items-center justify-between px-8">
        <div className="flex items-center gap-5">
          {/* 왼쪽 화살표 */}
          <button className="text-base-color-0 hover:text-gray-600 transition-colors">
            <IconBase icon={TriangleIcon} className="rotate-180" />
          </button>

          <span className="text-[28px] font-semibold text-black leading-none">DAY 1</span>

          {/* 오른쪽 화살표 */}
          <button className="text-base-color-0 hover:text-gray-600 transition-colors">
            <IconBase icon={TriangleIcon} />
          </button>
        </div>

        <span className="text-base-color-1 h9 font-medium">마우스로 블록을 드래그하여 일정을 조립하세요</span>
      </div>

      {/* 2. 메인 캔버스 영역 (드롭존) */}
      <div className="relative overflow-hidden h-screen bg-[#F8FAFC]">
        <div className={clsx('w-full h-full overflow-auto relative')}></div>
      </div>
    </div>
  );
};

export default BlockEditorContent;
