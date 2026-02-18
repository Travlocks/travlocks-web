import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import TemplateCard from './TemplateCard';
import { TemplateSwiperStyle } from './styles/TemplateSwiperStyles';
import type { Template } from '../home/types/template';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

// Props of TemplateSwiper
interface TemplateSwiperProps {
  cards: Template[]; // 표시할 템플릿 카드 배열
  type: 'recommended' | 'popular';
}

// Embla Carousel 설정 옵션
const options: EmblaOptionsType = {
  align: 'center',
  slidesToScroll: 1,
  loop: false,
};

/**
 * 템플릿 카드를 캐러셀 형태로 표시하는 스와이퍼 컴포넌트입니다.
 *
 * @description
 * - Embla Carousel을 사용하여 캐러셀 구현
 * - 휠 스크롤 시 카드 슬라이딩
 *
 * @param {TemplateSwiperProps} props - 컴포넌트 props
 * @returns {JSX.Element} 템플릿 스와이퍼 컴포넌트
 *
 * @example
 * <TemplateSwiper cards={templateList}
 */

const TemplateSwiper = ({ cards, type }: TemplateSwiperProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    WheelGesturesPlugin({
      forceWheelAxis: 'x',
    }),
  ]);

  const [selected, setSelected] = useState(0);

  const isCenter = (idx: number) => {
    return idx >= selected && idx <= selected + 2;
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelected(emblaApi.selectedScrollSnap()); // 선택된 인덱스 저장
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      className="w-full flex flex-col items-center"
      style={{
        transform: selected === 0 ? 'translateX(15vw)' : 'translateX(0px)',
        transition: 'transform 0.3s ease',
      }}>
      <div className="w-full">
        {/* Embla Carousel 컨테이너 */}
        <div className={TemplateSwiperStyle.embla} ref={emblaRef}>
          <div className={TemplateSwiperStyle.container}>
            {cards.map((card, idx) => (
              <div key={card.templateId} className={clsx(TemplateSwiperStyle.slide, !isCenter(idx) && 'scale-75')}>
                <TemplateCard template={card} type={type} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSwiper;
