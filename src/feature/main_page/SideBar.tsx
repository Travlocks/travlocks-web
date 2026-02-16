import PinIcon from '@assets/icon-pin.svg?react';
import ProfileImageUrl from '@assets/GNB/mask-group.svg?url';
import StarIcon from '@assets/icon-star.svg?react';
import TimeIcon from '@assets/icon-time.svg?react';
import RemixIcon from '@assets/icon-remix.svg?react';
import XIcon from '@assets/icon-x.svg?react';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTemplateDetailQuery } from './hooks/useTemplateDetailQuery';

const DEFAULT_LATITUDE = 35.1796;
const DEFAULT_LONGITUDE = 129.0756;

interface SideBarContentProps {
  templateId: number | null;
  onClose?: () => void;
  isClosing?: boolean;
}

const SideBarStatus = ({ message }: { message: string }) => {
  return (
    <div className="p-5 bg-base-color-5 rounded-[5px] border border-base-color">
      <p className="b4 text-base-color-3">{message}</p>
    </div>
  );
};

const SideBarContent = ({ templateId, onClose, isClosing }: SideBarContentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const { data: templateDetail, isLoading, isError } = useTemplateDetailQuery(templateId);

  const mapCenter = useMemo(() => {
    if (!templateDetail) {
      return { lat: DEFAULT_LATITUDE, lng: DEFAULT_LONGITUDE };
    }

    const firstPlace = templateDetail.vlocks.find(
      (vlock) =>
        typeof vlock.latitude === 'number' &&
        Number.isFinite(vlock.latitude) &&
        typeof vlock.longitude === 'number' &&
        Number.isFinite(vlock.longitude),
    );

    return {
      lat: firstPlace?.latitude ?? DEFAULT_LATITUDE,
      lng: firstPlace?.longitude ?? DEFAULT_LONGITUDE,
    };
  }, [templateDetail]);

  useEffect(() => {
    if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      if (!mapRef.current) return;

      const center = new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng);

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new window.kakao.maps.Map(mapRef.current, { center, level: 5 });
        return;
      }

      mapInstanceRef.current.setCenter(center);
    });
  }, [mapCenter.lat, mapCenter.lng]);

  const ratingText = templateDetail ? templateDetail.rating.toFixed(1) : '-';
  const tripDaysText = templateDetail?.tripDays ?? '-';
  const remixCountText = templateDetail ? `${templateDetail.remixCount}회` : '-';

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 z-50 w-195 h-full bg-base-color-6 flex flex-col overflow-y-auto',
        isClosing ? 'animate-slide-out-to-right' : 'animate-slide-in-from-right',
      )}>
      {/* 헤더 */}
      <div className="sticky top-0 bg-base-color-6 z-10 px-14 py-9.5 flex justify-end border-b border-base-color">
        <button type="button" onClick={onClose} className="cursor-pointer">
          <XIcon className="w-8 h-8 text-base-color-1" />
        </button>
      </div>

      <div className="px-10 pt-13.5 pb-10 flex flex-col gap-8">
        {templateId == null ? (
          <SideBarStatus message="템플릿 ID가 필요합니다." />
        ) : isLoading ? (
          <SideBarStatus message="템플릿 정보를 불러오는 중입니다." />
        ) : isError || !templateDetail ? (
          <SideBarStatus message="템플릿 정보를 불러오지 못했습니다." />
        ) : (
          <>
            {/* 타이틀 */}
            <div className="flex flex-col gap-5">
              <span className="h8 text-primary-color">{templateDetail.theme || '테마 없음'}</span>
              <h1 className="h2 text-base-color-0">{templateDetail.title}</h1>
              <div className="flex items-center gap-2 text-base-color-2 b3">
                <PinIcon />
                <span>{templateDetail.cityName || '지역 정보 없음'}</span>
                <span>·</span>
                <span>{templateDetail.tripDays || '-'}</span>
              </div>
            </div>

            {/* 프로필 카드 */}
            <div className="flex items-center gap-6.75 p-4.5 border border-base-color rounded-[5px] bg-base-color-5">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                <img
                  src={templateDetail.ownerProfileImage || ProfileImageUrl}
                  alt={`${templateDetail.ownerNickname} profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="h9 text-base-color-0">@{templateDetail.ownerNickname}</span>
            </div>

            {/* 통계 카드 */}
            <div className="flex gap-4.5">
              <div className="flex-1 bg-base-color-5 rounded-[10px] p-5 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center">
                  <StarIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="h9 text-base-color-0">{ratingText}</span>
                  <span className="b6 text-base-color-2">평점</span>
                </div>
              </div>

              <div className="flex-1 bg-base-color-5 rounded-[10px] p-5 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center">
                  <TimeIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="h9 text-base-color-0">{tripDaysText}</span>
                  <span className="b6 text-base-color-2">여행기간</span>
                </div>
              </div>

              <div className="flex-1 bg-base-color-5 rounded-[10px] p-5 flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center">
                  <RemixIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="h9 text-base-color-0">{remixCountText}</span>
                  <span className="b6 text-base-color-2">리믹스 수</span>
                </div>
              </div>
            </div>

            {/* 상세 설명 */}
            <div className="flex flex-col gap-4">
              <h3 className="h8 text-base-color-0">상세 설명</h3>
              <div className="p-5 bg-base-color-5 rounded-[5px] border border-base-color">
                <p className="b4 text-base-color-3">{templateDetail.description || '상세 설명이 없습니다.'}</p>
              </div>
            </div>

            {/* 태그 */}
            <div className="flex flex-col gap-4">
              <h3 className="h8 text-base-color-0">태그</h3>
              <div className="flex flex-wrap gap-2.5">
                {templateDetail.tags.length === 0 ? (
                  <span className="b4 text-base-color-2">태그가 없습니다.</span>
                ) : (
                  templateDetail.tags.map((tag) => (
                    <span
                      key={`${templateDetail.templateId}-${tag}`}
                      className="px-5 py-2.5 bg-base-color-6 border border-base-color rounded-full b4 text-base-color-2">
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* 지도 */}
            <div className="flex flex-col gap-4">
              <h3 className="h8 text-base-color-0">지도</h3>
              <div ref={mapRef} className="h-69.25 border border-base-color rounded-[5px] bg-base-color-4" />
            </div>

            {/* 리믹스 하기 버튼 */}
            <button
              type="button"
              className="w-full bg-primary-color hover:opacity-90 transition-opacity rounded-[5px] py-5 flex items-center justify-center gap-2.75">
              <RemixIcon className="w-7 h-7 [&_path]:fill-base-color-6" />
              <span className="b1 font-semibold text-base-color-6">리믹스 하기</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

interface SideBarProps {
  templateId?: number | string | null;
  onClose?: () => void;
}

const SideBar = ({ templateId, onClose }: SideBarProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const parsedTemplateId = useMemo(() => {
    if (templateId == null) return null;
    if (typeof templateId === 'string' && templateId.trim() === '') return null;

    const asNumber = typeof templateId === 'number' ? templateId : Number(templateId);
    return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : null;
  }, [templateId]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300); // 닫히는 애니메이션 시간과 일치
  };

  return (
    <>
      {/* Dim background */}
      <div
        className={clsx(
          'fixed inset-0 z-50 bg-black/50',
          isClosing ? 'animate-overlay-fade-out' : 'animate-overlay-fade-in',
        )}
        onClick={handleClose}
      />
      <SideBarContent templateId={parsedTemplateId} onClose={handleClose} isClosing={isClosing} />
    </>
  );
};

export default SideBar;
