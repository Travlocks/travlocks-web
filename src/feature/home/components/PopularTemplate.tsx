import TemplateSwiper from '@/feature/template/TemplateSwiper';
import useGetPopularTemplate from '../hooks/useQuery/useGetPopularTemplate';

const PopularTemplate = () => {
  const { data } = useGetPopularTemplate();

  return (
    <section className="h-[772px] bg-base-color-6 pt-[100px] pb-[28px]">
      <h1 className="h1 pl-[340px]">트래블록스에서 가장 인기 있는 템플릿</h1>
      <TemplateSwiper cards={data?.data ?? []} type="popular" />
    </section>
  );
};

export default PopularTemplate;
