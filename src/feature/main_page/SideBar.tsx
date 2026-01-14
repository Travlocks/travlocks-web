import { AppIcon } from '@/shared/ui/icon/AppIcon';
import LocationIcon from '@assets/icon-location.svg?react';

interface SideBarProps {
  onClose?: () => void;
}

const SideBar = ({ onClose }: SideBarProps) => {
  return (
    <div className="w-195 h-full bg-base-color-6 flex flex-col overflow-y-auto">
      {/* 헤더 */}
      <div className="sticky top-0 bg-base-color-6 z-10 p-6 flex justify-end">
        <button onClick={onClose} className="cursor-pointer">
          <AppIcon name="x" size={32} className="text-base-color-0" />
        </button>
      </div>

      <div className="px-10 pb-10 flex flex-col gap-8">
        {/* 타이틀 */}
        <div className="flex flex-col gap-5">
          <span className="h8 text-primary-color">템플릿 이름</span>
          <h1 className="h2 text-base-color-0">부산 푸드투어</h1>
          <div className="flex items-center gap-2 text-base-color-2 b3">
            <LocationIcon />
            <span>부산</span>
            <span>·</span>
            <span>2025.12.23 ~ 2025.12.24</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
