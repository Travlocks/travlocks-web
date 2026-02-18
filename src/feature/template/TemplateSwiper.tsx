import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import TemplateCard from './TemplateCard';
import { TemplateSwiperStyle } from './styles/TemplateSwiperStyles';
import type { Template } from '../home/types/template';

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
  console.log(cards);

  const [emblaRef] = useEmblaCarousel(options, [
    WheelGesturesPlugin({
      forceWheelAxis: 'x',
    }),
  ]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        {/* Embla Carousel 컨테이너 */}
        <div className={TemplateSwiperStyle.embla} ref={emblaRef}>
          <div className={TemplateSwiperStyle.container}>
            {cards.map((card) => (
              <div key={card.templateId} className={TemplateSwiperStyle.slide}>
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
