// components/card/TemplateCardSection.tsx

import TemplateCard from '@/feature/template/TemplateCard';
import TemplateCardSkeleton from '@/feature/template/TemplateCardSkeleton';
import EmptyResult from '@/feature/search/component/ResultSection/EmptyResult';
import ErrorResult from '@/feature/search/component/ResultSection/ErrorResult';
import PageNavigation from '@/feature/search/component/ResultSection/PageNavigation';
import type { SearchTemplateResponseDTO } from '@/feature/search/types/searchTemplate.types';

interface SearchResultCardsProps {
  isLoading: boolean;
  isError: boolean;
  data?: SearchTemplateResponseDTO;
  currentPage: number;
  onPageChange: (page: number) => void;
  onTemplateClick?: (templateId: number) => void;
}

/**
 * 템플릿 카드 섹션 컴포넌트
 *
 * @remarks
 * - API 호출 상태에 따라 다른 UI를 렌더링합니다:
 *   1. 로딩 중: TemplateCardSkeleton 9개
 *   2. 에러: ErrorResult
 *   3. 결과 없음: EmptyResult
 *   4. 정상: TemplateCard 리스트 + PageNavigation
 *
 * @param props.isLoading - 로딩 중 여부
 * @param props.isError - 에러 발생 여부
 * @param props.data - API 응답 데이터
 * @param props.currentPage - 현재 페이지 번호
 * @param props.onPageChange - 페이지 변경 시 호출되는 콜백
 * @param props.onTemplateClick - 템플릿 카드 클릭 시 호출되는 콜백
 * @param props.onRetry - 에러 발생 시 재시도 콜백
 */
const SearchResultCards = ({
  isLoading,
  isError,
  data,
  currentPage,
  onPageChange,
  onTemplateClick,
}: SearchResultCardsProps) => {
  // 로딩 중
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {Array.from({ length: 9 }).map((_, index) => (
          <TemplateCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // 에러 발생
  if (isError) {
    return <ErrorResult />;
  }

  // 결과 없음
  if (!data || data.templates.length === 0) {
    return <EmptyResult />;
  }

  // 정상: 카드 리스트 + 페이지네이션
  return (
    <div className="flex flex-col gap-[80px]">
      {/* 템플릿 카드 그리드 (3x3) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {data.templates.map((template) => (
          <TemplateCard key={template.templateId} template={template} onClick={onTemplateClick} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <PageNavigation currentPage={currentPage} totalPages={data.pagination.totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default SearchResultCards;
