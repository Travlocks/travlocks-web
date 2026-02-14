import { useParams } from 'react-router-dom';
import ProfileLayout from '@/feature/mypage/components/ProfileLayout';
import { useMemberProfileQuery } from '@/feature/mypage/hooks/useMemberProfileQuery';

const MemberVlocksPage = () => {
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
      title={`${memberProfileData.nickname}님이 생성한 Vlocks`}
      description={`${memberProfileData.nickname}님이 생성한 Vlocks 입니다. 블록을 조립해 새 여행을 계획해보세요.`}
      children={null}>
      {/* TODO: /member/:memberId/vlocks 목록 API가 결정되면 목록 렌더링 구현 */}
      {/* TODO: 현재는 슬롯 영역만 유지하고 실제 리스트 컴포넌트는 비워둠 */}
    </ProfileLayout>
  );
};

export default MemberVlocksPage;
