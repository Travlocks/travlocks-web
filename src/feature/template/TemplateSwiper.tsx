import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import TemplateCard from './TemplateCard';
import type { Template } from '../home/types/template';
import clsx from 'clsx';

const AUTOPLAY_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 50;
const INTERACTION_PAUSE_MS = 8000;

// Props of TemplateSwiper
interface TemplateSwiperProps {
  cards: Template[]; // 표시할 템플릿 카드 배열
  type: 'recommended' | 'popular';
  onCardClick?: (templateId: number) => void;
}

const getInitialIndex = (length: number) => {
  if (length <= 0) return 0;
  return Math.min(2, length - 1);
};

const TemplateSwiper = ({ cards, type, onCardClick }: TemplateSwiperProps) => {
  const [activeIndex, setActiveIndex] = useState(() => getInitialIndex(cards.length));
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);
  const dragStartXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const interactionPauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoplayTemporarily = useCallback(() => {
    setIsInteractionPaused(true);
    if (interactionPauseTimerRef.current) {
      clearTimeout(interactionPauseTimerRef.current);
    }
    interactionPauseTimerRef.current = setTimeout(() => {
      setIsInteractionPaused(false);
    }, INTERACTION_PAUSE_MS);
  }, []);

  const moveIndex = useCallback(
    (direction: 1 | -1, loop = false) => {
      if (cards.length <= 1) return;
      setActiveIndex((prev) => {
        const index = Math.min(prev, cards.length - 1);
        if (direction === 1) {
          if (index >= cards.length - 1) return loop ? 0 : index;
          return index + 1;
        }
        if (index <= 0) return loop ? cards.length - 1 : index;
        return index - 1;
      });
    },
    [cards.length],
  );

  const goNext = useCallback(() => moveIndex(1, true), [moveIndex]);
  const goPrev = useCallback(() => moveIndex(-1, true), [moveIndex]);

  const safeActiveIndex = cards.length === 0 ? 0 : Math.min(activeIndex, cards.length - 1);

  // 반응형 뷰포트 너비 업데이트
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 실행
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    activeIndexRef.current = safeActiveIndex;
  }, [safeActiveIndex]);

  useEffect(() => {
    return () => {
      if (interactionPauseTimerRef.current) {
        clearTimeout(interactionPauseTimerRef.current);
      }
    };
  }, []);

  const isAutoplayActive = cards.length > 1 && !isHovered && !isInteractionPaused;

  // n초마다 다음 카드로 자동 전환
  useEffect(() => {
    if (!isAutoplayActive) return;

    const timerId = setInterval(goNext, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timerId);
  }, [isAutoplayActive, goNext]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (cards.length <= 1) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || cards.length <= 1) return;

    isDraggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;

    pauseAutoplayTemporarily();
    if (deltaX < 0) goNext();
    else goPrev();
  };

  const handlePointerCancel = () => {
    isDraggingRef.current = false;
  };

  // 휠/트랙패드 스크롤 핸들러
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isThrottled = false;

    const handleWheel = (e: WheelEvent) => {
      if (isThrottled) return;

      // 가로(deltaX) 또는 세로(deltaY) 스크롤 감지
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const threshold = 30; // 감도 조절

      if (Math.abs(delta) <= threshold) return;

      const currentIndex = activeIndexRef.current;

      // 첫/마지막 카드에서 페이지 세로 스크롤이 가능하도록
      if (delta < 0 && currentIndex === 0) return;
      if (delta > 0 && currentIndex === cards.length - 1) return;

      e.preventDefault();
      pauseAutoplayTemporarily();

      if (delta > 0) moveIndex(1);
      else moveIndex(-1);

      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 500); // 쿨타임 (너무 빠른 넘김 방지)
    };

    // passive: false로 설정해야 e.preventDefault()가 동작함 (페이지 전체 스크롤 방지)
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [cards.length, moveIndex, pauseAutoplayTemporarily]);

  // 어떤 카드가 크게 보일지 결정 (현재 activeIndex와 그 양옆)
  const isIndexLarge = (idx: number) => {
    return idx >= safeActiveIndex - 1 && idx <= safeActiveIndex + 1;
  };

  /**
   * 정중앙 정렬 로직 (Loop 없음)
   */
  const calculateOffset = () => {
    if (cards.length === 0) return 0;

    const GAP = 40;
    const CARD_WIDTH = 387;
    const LARGE_WIDTH = CARD_WIDTH + GAP;
    const SMALL_WIDTH = CARD_WIDTH * 0.9 + GAP;

    let totalOffsetBefore = 0;
    for (let i = 0; i < safeActiveIndex; i++) {
      totalOffsetBefore += isIndexLarge(i) ? LARGE_WIDTH : SMALL_WIDTH;
    }

    // 현재(Active) 카드의 절반 너비 (항상 Large)
    const currentCardHalf = LARGE_WIDTH / 2;

    return viewportWidth / 2 - (totalOffsetBefore + currentCardHalf);
  };

  return (
    <div
      className={clsx(
        'relative w-full overflow-hidden py-10 select-none',
        type === 'recommended' ? 'bg-base-color-5' : 'bg-base-color-6',
      )}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{ touchAction: 'pan-y' }}>
      {/* Carousel Body */}
      <div className="relative flex items-center min-h-[500px]">
        <motion.div
          className="flex items-center"
          animate={{
            x: calculateOffset(),
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            mass: 0.8,
          }}>
          {cards.map((card, idx) => {
            const isLarge = isIndexLarge(idx);

            // TemplateCard 기본 너비 387px
            // GAP 40px
            // Large Width = 387 + 40 = 427
            // Small Width = (387 * 0.9) + 40 = 348.3 + 40 = 388.3
            const targetWidth = isLarge ? 427 : 388.3;

            return (
              <motion.div
                key={card.templateId}
                className={clsx(
                  'flex-shrink-0 px-[20px]', // GAP/2
                  'flex justify-center',
                )}
                animate={{
                  width: targetWidth, // 실제 레이아웃 너비 조정
                  scale: isLarge ? 1 : 0.9,
                  opacity: isLarge ? 1 : 0.5,
                  filter: isLarge ? 'blur(0px)' : 'blur(2px)',
                }}>
                {/* TemplateCard의 크기가 확실히 잡히도록 pointer-events 설정 */}
                <div className="pointer-events-auto w-[387px]">
                  <TemplateCard template={card} type={type} onCardClick={onCardClick} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateSwiper;
