import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import TemplateCard from './TemplateCard';
import type { Template } from '../home/types/template';
import clsx from 'clsx';

// Props of TemplateSwiper
interface TemplateSwiperProps {
  cards: Template[]; // 표시할 템플릿 카드 배열
  type: 'recommended' | 'popular';
  onCardClick?: (templateId: number) => void;
}

const TemplateSwiper = ({ cards, type, onCardClick }: TemplateSwiperProps) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex); // ref를 통해 항상 최신 activeIndex 읽음

  // 반응형 뷰포트 너비 업데이트
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 실행
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

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

      // 처음 activeIndex가 1일 때 이전 카드로 넘어가는 문제 방지
      if (delta < 0 && currentIndex === 1) {
        // 첫 카드에서 위로 스크롤 → 기본 페이지 스크롤 되도록
        return;
      }

      e.preventDefault();

      if (delta > 0) {
        // 오른쪽/아래로 스크롤 -> 다음 카드
        setActiveIndex((prev) => Math.min(prev + 1, cards.length - 1));
      } else {
        // 왼쪽/위로 스크롤 -> 이전 카드
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }

      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 500); // 쿨타임 (너무 빠른 넘김 방지)
    };

    // passive: false로 설정해야 e.preventDefault()가 동작함 (페이지 전체 스크롤 방지)
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [cards.length]);

  // 어떤 카드가 크게 보일지 결정 (현재 activeIndex와 그 양옆)
  const isIndexLarge = (idx: number) => {
    return idx >= activeIndex - 1 && idx <= activeIndex + 1;
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
    for (let i = 0; i < activeIndex; i++) {
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
      ref={containerRef}>
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
