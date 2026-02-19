import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileLayout from '@/feature/mypage/components/ProfileLayout';
import { useMemberProfileQuery } from '@/feature/mypage/hooks/useMemberProfileQuery';
import TemplateCard from '@/feature/template/TemplateCard';
import { toTemplateCard } from '@/feature/mypage/utils/templateAdapter';
import SideBar from '@/feature/main_page/SideBar';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';

const MemberTemplatesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const { memberId } = useParams<{ memberId: string }>();
  const memberIdNumber = memberId ? Number(memberId) : undefined;
  const { data: memberProfileData, isLoading, isError } = useMemberProfileQuery(memberIdNumber, 0);

  const templates = (memberProfileData?.templates.content ?? []).map(toTemplateCard);

  const handleCardClick = (templateId: number) => {
    /**
     * 온보딩 진입 흐름과 동일하게 템플릿 ID를 선동기화합니다.
     *
     * @remarks
     * - 멤버 템플릿 카드를 클릭한 즉시 store.templateId를 현재 카드 기준으로 갱신합니다.
     * - 이후 사이드바에서 리믹스/블록 진입이 발생해도 템플릿 컨텍스트를 일관되게 유지합니다.
     * - 템플릿 전환 시점의 상태 기준을 다른 진입 경로(Onboarding, MyPage)와 통일합니다.
     */
    useBlockTemplateStore.getState().setTemplateId(String(templateId));
    setSelectedTemplateId(templateId);
    setIsSidebarOpen(true);
  };

  if (isLoading) {
    return <div className="px-6 py-12 text-center">로딩 중...</div>;
  }

  if (isError || !memberProfileData) {
    return <div className="px-6 py-12 text-center text-red-500">데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <>
      <ProfileLayout
        nickname={memberProfileData.nickname}
        introduction={memberProfileData.introduction}
        profileImageUrl={memberProfileData.profileImageUrl}
        title={`${memberProfileData.nickname}님이 만든 템플릿`}
        description={`${memberProfileData.nickname}님이 만든 템플릿 목록입니다.`}
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

export default MemberTemplatesPage;
