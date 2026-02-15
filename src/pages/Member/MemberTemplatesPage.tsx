import { useParams } from 'react-router-dom';
import ProfileLayout from '@/feature/mypage/components/ProfileLayout';
import { useMemberProfileQuery } from '@/feature/mypage/hooks/useMemberProfileQuery';
import TemplateCard from '@/feature/template/TemplateCard';
import { toTemplateCard } from '@/feature/mypage/utils/templateAdapter';

const MemberTemplatesPage = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const memberIdNumber = memberId ? Number(memberId) : undefined;
  const { data: memberProfileData, isLoading, isError } = useMemberProfileQuery(memberIdNumber, 0);

  const templates = (memberProfileData?.templates.content ?? []).map(toTemplateCard);

  if (isLoading) {
    return <div className="px-6 py-12 text-center">로딩 중...</div>;
  }

  if (isError || !memberProfileData) {
    return <div className="px-6 py-12 text-center text-red-500">데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
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
              <TemplateCard key={template.templateId} template={template} disableAuthorProfileNavigation />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-base-color-1">등록된 템플릿이 없습니다.</p>
        )
      }
    />
  );
};

export default MemberTemplatesPage;
