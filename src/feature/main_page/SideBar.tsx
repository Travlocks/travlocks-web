import { AppIcon } from '@/shared/ui/icon/AppIcon';
import LocationIcon from '@assets/icon-location.svg?react';
import ProfileImageUrl from '@assets/GNB/mask-group.svg?url';
import StarIcon from '@assets/icon-star.svg?react';
import TimeIcon from '@assets/icon-time.svg?react';
import RemixIcon from '@assets/icon-remix.svg?react';

interface SideBarProps {
  onClose?: () => void;
}

const SideBar = ({ onClose }: SideBarProps) => {
  return (
    <div className="w-195 h-full bg-base-color-6 flex flex-col overflow-y-auto">
      {/* 헤더 */}
      <div className="sticky top-0 bg-base-color-6 z-10 p-17.5 flex justify-end">
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

        {/* 프로필 카드 */}
        <div className="flex gap-2.5 p-4.5 border border-base-color rounded-[5px] bg-base-color-5">
          <div className="w-15 h-15 rounded-full overflow-hidden">
            <img src={ProfileImageUrl} alt="profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-1 justify-center">
            <span className="b5 text-base-color-0">@먹잘알</span>
            <span className="b6 text-base-color-1 leading-tight">
              부산의 다양한 놀거리, 먹을거리, 즐길거리에 대해 올리고 있어요~
            </span>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="flex gap-4.5">
          <div className="flex-1 bg-base-color-5 rounded-[10px] p-5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center">
              <StarIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-center">
              <span className="h9 text-base-color-0">4.8</span>
              <span className="b6 text-base-color-2">평점</span>
            </div>
          </div>

          <div className="flex-1 bg-base-color-5 rounded-[10px] p-5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center">
              <TimeIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-center">
              <span className="h9 text-base-color-0">1~2시간</span>
              <span className="b6 text-base-color-2">체류시간</span>
            </div>
          </div>

          <div className="flex-1 bg-base-color-5 rounded-[10px] p-5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center">
              <RemixIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-center">
              <span className="h9 text-base-color-0">12회</span>
              <span className="b6 text-base-color-2">리믹스 수</span>
            </div>
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="flex flex-col gap-4">
          <h3 className="h8 text-base-color-0">상세 설명</h3>
          <div className="p-5 bg-base-color-5 rounded-[5px] border border-base-color">
            <p className="b4 text-base-color-3">부산 인생 23년차 최고의 맛집들만 모았습니다 ^^</p>
          </div>
        </div>

        {/* 태그 */}
        <div className="flex flex-col gap-4">
          <h3 className="h8 text-base-color-0">태그</h3>
          <div className="flex flex-wrap gap-2.5">
            <span className="px-5 py-2.5 bg-base-color-6 border border-base-color rounded-full b4 text-base-color-2">
              #부산
            </span>
            <span className="px-5 py-2.5 bg-base-color-6 border border-base-color rounded-full b4 text-base-color-2">
              #부산여행
            </span>
            <span className="px-5 py-2.5 bg-base-color-6 border border-base-color rounded-full b4 text-base-color-2">
              #맛집
            </span>
            <span className="px-5 py-2.5 bg-base-color-6 border border-base-color rounded-full b4 text-base-color-2">
              #부산맛집
            </span>
          </div>
        </div>

        {/* 지도 */}
        <div className="flex flex-col gap-4">
          <h3 className="h8 text-base-color-0">지도</h3>
          {/* TODO: Integrate actual map component or API */}
          <div className="h-[277px] border border-base-color rounded-[5px] bg-base-color-4" />
        </div>

        {/* 리믹스 하기 버튼 */}
        <button className="w-full bg-primary-color hover:opacity-90 transition-opacity rounded-[5px] py-5 flex items-center justify-center gap-2.75">
          <RemixIcon className="w-7 h-7 [&_path]:fill-base-color-6" />
          <span className="b1 font-semibold text-base-color-6">리믹스 하기</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
