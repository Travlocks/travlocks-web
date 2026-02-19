import { useState } from 'react';
import { useMyPageQuery } from '@/feature/mypage/hooks/useMyPageQuery';
import { useMyTemplatesQuery } from '@/feature/mypage/hooks/useMyTemplatesQuery';
import TemplateCard from '@/feature/template/TemplateCard';
import ProfileLayout from '@/feature/mypage/components/ProfileLayout';
import { toTemplateCard } from '@/feature/mypage/utils/templateAdapter';
import SideBar from '@/feature/main_page/SideBar';

const TemplatesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const { data: myPageData, isLoading: isProfileLoading, isError: isProfileError } = useMyPageQuery();
  const { data: templateData, isLoading: isTemplateLoading, isError: isTemplateError } = useMyTemplatesQuery(0);

  const templates = (templateData?.content ?? []).map(toTemplateCard);

  const handleCardClick = (templateId: number) => {
    setSelectedTemplateId(templateId);
    setIsSidebarOpen(true);
  };

  if (isProfileLoading || isTemplateLoading) {
    return <div className="px-6 py-12 text-center">로딩 중...</div>;
  }

  if (isProfileError || isTemplateError || !myPageData) {
    return <div className="px-6 py-12 text-center text-red-500">데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <>
      <ProfileLayout
        nickname={myPageData.nickname}
        introduction={myPageData.introduction}
        profileImageUrl={myPageData.profileImageUrl}
        title={`${myPageData.nickname}님이 만든 템플릿`}
        description={`${myPageData.nickname}님이 만든 템플릿 목록입니다.`}
        children={
          templates.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-[18px] gap-y-[40px] sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <TemplateCard
                  key={template.templateId}
                  template={template}
                  type="popular"
                  disableAuthorProfileNavigation
                  onCardClick={handleCardClick}
                  hasDelete={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-base-color-1">등록된 템플릿이 없습니다.</p>
          )
        }
      />
      {isSidebarOpen && selectedTemplateId && (
        <SideBar templateId={selectedTemplateId} onClose={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
};

export default TemplatesPage;
