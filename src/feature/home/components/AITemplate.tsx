import useGetMyPage from '@/feature/user/hooks/queries/useGetMypage';

import TemplateSwiper from '@/feature/template/TemplateSwiper';
import useGetAITemplate from '../hooks/useQuery/useGetAITemplate';

interface AITemplateProps {
  onCardClick?: (templateId: number) => void;
}

const AITemplate = ({ onCardClick }: AITemplateProps) => {
  const { data: userData } = useGetMyPage();
  const { data } = useGetAITemplate();

  return (
    <section className="h-[772px] bg-base-color-5 pt-[100px] pb-[28px] flex flex-col items-center">
      <div className="max-w-[1218px] w-full">
        <h1 className="h1">{userData?.data.nickname}님을 위해 AI가 추천하는 템플릿</h1>
      </div>

      <TemplateSwiper cards={data?.data.templates ?? []} type="recommended" onCardClick={onCardClick} />
    </section>
  );
};

export default AITemplate;
