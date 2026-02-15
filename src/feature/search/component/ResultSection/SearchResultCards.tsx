import TemplateCard from '@/feature/template/TemplateCard';
import TemplateCardSkeleton from '@/feature/template/TemplateCardSkeleton';
import EmptyResultCard from '@/shared/components/EmptyResultCard';
import PageNavigation from '@/feature/search/component/ResultSection/PageNavigation';
import type { SearchTemplateResponseDTO } from '@/feature/search/types/searchTemplate.types';

/**
 * 검색 결과 카드 컴포넌트의 Props
 */
interface SearchResultCardsProps {
  /** API 로딩 중 여부 */
  isLoading: boolean;

  /** API 에러 발생 여부 */
  isError: boolean;

  /** API 응답 데이터 */
  data?: SearchTemplateResponseDTO;

  /** 현재 페이지 번호 */
  currentPage: number;

  /** 페이지 변경 시 호출되는 콜백 함수 */
  onPageChange: (page: number) => void;

  /** 템플릿 카드 영역 클릭 시 호출되는 콜백 함수 */
  onCardClick?: (templateId: number) => void;
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
 */
const SearchResultCards = ({
  isLoading,
  isError,
  data,
  currentPage,
  onPageChange,
  onCardClick,
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
    return (
      <EmptyResultCard
        title="해당 조건에 맞는 템플릿이 없어요."
        label="하지만 트래블록스에선 없는 여행도 바로 만들 수 있어요"
      />
    );
  }

  // 결과 없음
  // SuccessPayload 사용 시 data.data가 PageResponse<Template>입니다.
  if (!data?.data?.content || data.data.content.length === 0) {
    return (
      <EmptyResultCard
        title="해당 조건에 맞는 템플릿이 없어요."
        label="하지만 트래블록스에선 없는 여행도 바로 만들 수 있어요"
      />
    );
  }

  // 정상: 카드 리스트 + 페이지네이션
  return (
    <div className="flex flex-col gap-[80px]">
      {/* 템플릿 카드 그리드 (3x3) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {data.data.content.map((template) => (
          <TemplateCard key={template.templateId} template={template} onCardClick={onCardClick} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <PageNavigation currentPage={currentPage} totalPages={data.data.totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default SearchResultCards;
