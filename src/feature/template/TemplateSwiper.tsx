import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import TemplateCard from './TemplateCard';
import type { Template } from './template.types';
import { templateSwiperStyles } from './styles/TemplateSwiperStyles';

// Props of TemplateSwiper
interface TemplateSwiperProps {
  cards: Template[]; // 표시할 템플릿 카드 배열
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

const TemplateSwiper = ({ cards }: TemplateSwiperProps) => {
  const [emblaRef] = useEmblaCarousel(options, [
    WheelGesturesPlugin({
      forceWheelAxis: 'x',
    }),
  ]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        {/* Embla Carousel 컨테이너 */}
        <div className={templateSwiperStyles.embla} ref={emblaRef}>
          <div className={templateSwiperStyles.container}>
            {cards.map((card) => (
              <div key={card.templateId} className={templateSwiperStyles.slide}>
                <TemplateCard template={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSwiper;
