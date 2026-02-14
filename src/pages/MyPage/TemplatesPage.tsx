import { useMyPageQuery } from '@/feature/mypage/hooks/useMyPageQuery';
import { useMyTemplatesQuery } from '@/feature/mypage/hooks/useMyTemplatesQuery';
import ProfileLayout from '@/feature/mypage/components/ProfileLayout';

const TemplatesPage = () => {
  const { data: myPageData, isLoading: isProfileLoading, isError: isProfileError } = useMyPageQuery();
  const { data: templateData, isLoading: isTemplateLoading, isError: isTemplateError } = useMyTemplatesQuery(0);
  void templateData;

  if (isProfileLoading || isTemplateLoading) {
    return <div className="px-6 py-12 text-center">로딩 중...</div>;
  }

  if (isProfileError || isTemplateError || !myPageData) {
    return <div className="px-6 py-12 text-center text-red-500">데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ProfileLayout
      nickname={myPageData.nickname}
      introduction={myPageData.introduction}
      profileImageUrl={myPageData.profileImageUrl}
      title={`${myPageData.nickname}님이 만든 템플릿`}
      description={`${myPageData.nickname}님이 만든 템플릿 목록입니다.`}
      children={null}>
      {/* TODO: /mypage/templates 목록 API 연동 후 템플릿 리스트 렌더링 구현 */}
      {/* TODO: 현재 슬롯은 비우고 레이아웃만 유지 */}
    </ProfileLayout>
  );
};

export default TemplatesPage;
