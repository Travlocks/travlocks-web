import TemplateSwiper from '@/feature/template/TemplateSwiper';
import useGetPopularTemplate from '../hooks/useQuery/useGetPopularTemplate';

interface PopularTemplateProps {
  onCardClick?: (templateId: number) => void;
}

const PopularTemplate = ({ onCardClick }: PopularTemplateProps) => {
  const { data } = useGetPopularTemplate();

  return (
    <section className="h-[772px] bg-base-color-6 pt-[100px] pb-[28px] flex flex-col items-center">
      <div className="max-w-[1218px] w-full">
        <h1 className="h1">트래블록스에서 가장 인기 있는 템플릿</h1>
      </div>

      <TemplateSwiper cards={data?.data ?? []} type="popular" onCardClick={onCardClick} />
    </section>
  );
};

export default PopularTemplate;
