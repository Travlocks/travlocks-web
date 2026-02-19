import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMyPageQuery } from '@/feature/mypage/hooks/useMyPageQuery';
import { type MyTemplateFilter, useMyTemplatesQuery } from '@/feature/mypage/hooks/useMyTemplatesQuery';
import TemplateCard from '@/feature/template/TemplateCard';
import ProfileLayout from '@/feature/mypage/components/ProfileLayout';
import { toTemplateCard } from '@/feature/mypage/utils/templateAdapter';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';

const parseFilter = (value: string | null): MyTemplateFilter => {
  if (value === 'favorite') {
    return 'favorite';
  }
  return 'created';
};

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filter = parseFilter(searchParams.get('filter'));
  const isFavoriteFilter = filter === 'favorite';
  const { data: myPageData, isLoading: isProfileLoading, isError: isProfileError } = useMyPageQuery();
  const { data: templateData, isLoading: isTemplateLoading, isError: isTemplateError } = useMyTemplatesQuery(0, filter);

  const templates = (templateData?.content ?? []).map(toTemplateCard);

  const handleCardClick = (templateId: number) => {
    /**
     * 온보딩 진입 흐름과 동일하게 템플릿 ID를 선동기화합니다.
     *
     * @remarks
     * - `/block/:templateId` 라우트로 이동하기 전에 store.templateId를 먼저 갱신합니다.
     * - 이렇게 하면 페이지 전환 직후 이전 템플릿 편집 상태가 잠깐 보이는 현상을 줄일 수 있습니다.
     * - BlockPage의 초기화 로직(setTemplateId 기준)이 동일한 기준으로 동작하도록 맞춥니다.
     */
    useBlockTemplateStore.getState().setTemplateId(String(templateId));
    navigate(`/block/${templateId}`);
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
        title={isFavoriteFilter ? `${myPageData.nickname}님이 저장한 템플릿` : `${myPageData.nickname}님이 만든 템플릿`}
        description={
          isFavoriteFilter
            ? `${myPageData.nickname}님이 즐겨찾기한 템플릿 목록입니다.`
            : `${myPageData.nickname}님이 만든 템플릿 목록입니다.`
        }
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
            <p className="text-center text-lg text-base-color-1">
              {isFavoriteFilter ? '즐겨찾기한 템플릿이 없습니다.' : '등록된 템플릿이 없습니다.'}
            </p>
          )
        }
      />
    </>
  );
};

export default TemplatesPage;
