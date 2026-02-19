import PinIcon from '@assets/icon-pin.svg?react';
import ProfileImageUrl from '@assets/GNB/mask-group.svg?url';
import StarIcon from '@assets/icon-star.svg?react';
import TimeIcon from '@assets/icon-time.svg?react';
import RemixIcon from '@assets/icon-remix.svg?react';
import XIcon from '@assets/icon-x.svg?react';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useTemplateDetail } from './hooks/queries/useTemplateDetail';
import usePostTemplateRemix from '@/feature/home/hooks/mutations/usePostTemplateRemix';
import DefaultThumbnail from '@assets/template/thumbnail.png';
import HeartIcon from '@assets/heart.svg?react';
import { useToggleFavorite } from './hooks/mutations/useToggleFavorite';
import { toast } from '@/shared/stores/toastStore';
import type { ResponseRemixDto } from '@/feature/home/types/template';
import { motion, AnimatePresence } from 'motion/react';
import { formatOneDecimal } from '@/shared/utils/format';

interface SideBarContentProps {
  templateId: number;
  onClose?: () => void;
  isClosing?: boolean;
}

const SideBarContent = ({ templateId, onClose, isClosing }: SideBarContentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { mutate: remixMutate } = usePostTemplateRemix(); // 템플릿 리믹스
  const { mutate: toggleFavoriteMutate } = useToggleFavorite(); // 즐겨찾기 토글

  // API 데이터 호출
  const { data: detailResponse } = useTemplateDetail(templateId);
  const detail = detailResponse?.data;

  // 로컬 상태는 API 데이터가 로드되면 초기화
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isRemixHovered, setIsRemixHovered] = useState(false);
  const [prevIsFavorited, setPrevIsFavorited] = useState<boolean | null>(null);

  // useEffect 대신 렌더링 도중 동기화 (Lint: react-hooks/set-state-in-effect 해결)
  if (detail && detail.isFavorited !== prevIsFavorited) {
    setPrevIsFavorited(detail.isFavorited);
    setIsLiked(detail.isFavorited);
  }

  useEffect(() => {
    if (!mapRef.current || !window.kakao || !detail) return;

    window.kakao.maps.load(() => {
      const firstVlock = detail.vlocks?.[0];
      const lat = firstVlock?.latitude ?? 35.1796;
      const lng = firstVlock?.longitude ?? 129.0756;

      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 5,
      };
      new window.kakao.maps.Map(mapRef.current!, options);
    });
  }, [detail]);

  const handleHeartClick = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);

    // Toast 알림
    if (nextState) {
      toast.favorite('내 보관함에 저장되었습니다.');
    } else {
      toast.unfavorite('보관함에서 삭제되었습니다.');
    }

    toggleFavoriteMutate(
      { templateId, isFavorited: nextState },
      {
        onError: () => {
          // 실패 시 복구
          setIsLiked(!nextState);
          toast.error('요청 처리에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 z-50 w-195 h-full bg-base-color-6 flex flex-col overflow-y-auto',
        isClosing ? 'animate-slide-out-to-right' : 'animate-slide-in-from-right',
      )}>
      {/* 헤더 */}
      <div className="sticky top-0 bg-base-color-6 z-10 px-14 py-9.5 flex justify-end border-b border-base-color">
        <button onClick={onClose} className="cursor-pointer">
          <XIcon className="w-8 h-8 text-base-color-1" />
        </button>
      </div>

      <div className="px-10 pt-13.5 pb-16 flex flex-col gap-8">
        {/* 타이틀 */}
        <div className="flex flex-col gap-5">
          <span className="h8 text-primary-color">템플릿 이름</span>
          <h1 className="h2 text-base-color-0">{detail?.title}</h1>
          <div className="flex items-center gap-2 text-base-color-2 b3">
            <PinIcon />
            <span>{detail?.cityName}</span>
            <span>·</span>
            <span>{detail?.theme}</span>
          </div>
        </div>

        {/* 프로필 카드 */}
        <div className="flex items-center gap-6.75 p-4.5 border border-base-color rounded-[5px] bg-base-color-5">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
            <img
              src={detail?.ownerProfileImage || ProfileImageUrl}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="h9 text-base-color-0">@{detail?.ownerNickname}</span>
        </div>

        {/* 템플릿 커버 이미지 */}
        <div className="w-full h-[330px] rounded-[5px] overflow-hidden relative">
          <button type="button" onClick={handleHeartClick} className="absolute top-[20px] right-[20px]">
            <div className="w-[40px] h-[40px] rounded-full bg-base-color-4 flex items-center justify-center cursor-pointer">
              <HeartIcon
                className={clsx(
                  'w-[20px] h-[20px] text-base-color-3 transition-colors',
                  isLiked ? 'fill-[#FF69B4]' : 'fill-none',
                )}
              />
            </div>
          </button>
          <img src={detail?.coverImageUrl || DefaultThumbnail} alt="cover" className="w-full h-full object-cover" />
        </div>

        {/* 통계 카드 */}
        <div className="flex gap-4.5">
          <div className="flex-1 bg-base-color-5 rounded-[10px] p-5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center">
              <StarIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-center">
              <span className="h9 text-base-color-0">{formatOneDecimal(detail?.rating)}</span>
              <span className="b6 text-base-color-2">평점</span>
            </div>
          </div>

          <div className="flex-1 bg-base-color-5 rounded-[10px] p-5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center">
              <TimeIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-center">
              <span className="h9 text-base-color-0">{detail?.tripDays}</span>
              <span className="b6 text-base-color-2">여행기간</span>
            </div>
          </div>

          <div className="flex-1 bg-base-color-5 rounded-[10px] p-5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center">
              <RemixIcon className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-center">
              <span className="h9 text-base-color-0">{detail?.remixCount}</span>
              <span className="b6 text-base-color-2">리믹스 수</span>
            </div>
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="flex flex-col gap-4">
          <h3 className="h8 text-base-color-0">상세 설명</h3>
          <div className="p-5 bg-base-color-5 rounded-[5px] border border-base-color">
            {detail?.description ? (
              <p className="b4 text-base-color-3">{detail?.description}</p>
            ) : (
              <p className="b4 text-base-color-3">상세 설명이 없습니다.</p>
            )}
          </div>
        </div>

        {/* 태그 */}
        <div className="flex flex-col gap-4">
          <h3 className="h8 text-base-color-0">태그</h3>
          <div className="flex flex-wrap gap-2.5">
            {detail?.tags.map((tag) => (
              <span
                key={tag}
                className="px-5 py-2.5 bg-base-color-6 border border-base-color rounded-full b4 text-base-color-2">
                #{tag}
              </span>
            ))}
            {detail?.tags.length === 0 && <p className="b4 text-base-color-3">태그가 존재하지 않습니다.</p>}
          </div>
        </div>

        {/* 지도 */}
        <div className="flex flex-col gap-4">
          <h3 className="h8 text-base-color-0">지도</h3>
          <div ref={mapRef} className="h-69.25 border border-base-color rounded-[5px] bg-base-color-4" />
        </div>

        {/* 리믹스 하기 버튼 */}
        <div className="relative w-full">
          <button
            onMouseEnter={() => setIsRemixHovered(true)}
            onMouseLeave={() => setIsRemixHovered(false)}
            onClick={() => {
              remixMutate(templateId, {
                onSuccess: (data: ResponseRemixDto) => {
                  navigate(`/block/${data.data.remixedTemplateId}`);
                },
              });
            }}
            className="w-full bg-primary-color hover:opacity-90 transition-opacity rounded-[5px] py-5 flex items-center justify-center gap-2.75">
            <RemixIcon className="w-7 h-7 [&_path]:fill-base-color-6" />
            <span className="b1 font-semibold text-base-color-6">리믹스 하기</span>
          </button>

          <AnimatePresence>
            {isRemixHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 10, x: '-50%' }}
                className="absolute left-1/2 top-[calc(100%+12px)] z-20">
                {/* Tooltip Bubble */}
                <div className="bg-[#222222] text-white text-[14px] px-4 py-2 rounded-[8px] whitespace-nowrap relative shadow-lg font-medium">
                  원본 템플릿은 변경되지 않아요
                  {/* Tooltip Arrow */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-[#222222]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

interface SideBarProps {
  templateId: number;
  onClose?: () => void;
}

const SideBar = ({ templateId, onClose }: SideBarProps) => {
  const [isClosing, setIsClosing] = useState(false);

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
      <SideBarContent templateId={templateId} onClose={handleClose} isClosing={isClosing} />
    </>
  );
};

export default SideBar;
