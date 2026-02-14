import { useParams } from 'react-router-dom';
import ProfileLayout from '@/feature/mypage/components/ProfileLayout';
import { useMemberProfileQuery } from '@/feature/mypage/hooks/useMemberProfileQuery';

const MemberTemplatesPage = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const memberIdNumber = memberId ? Number(memberId) : undefined;
  const { data: memberProfileData, isLoading, isError } = useMemberProfileQuery(memberIdNumber);

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
      children={null}>
      {/* TODO: /member/:memberId/templates 공개 템플릿 API 연동 후 템플릿 리스트 렌더링 구현 */}
      {/* TODO: 현재 슬롯은 비우고 레이아웃만 유지 */}
    </ProfileLayout>
  );
};

export default MemberTemplatesPage;
