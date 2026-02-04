import ArrowLeftIcon from '@/shared/assets/icon-arrow-left.svg?react';
import ArrowRightIcon from '@/shared/assets/icon-arrow-right.svg?react';
import { pageNavigationStyle } from '@/feature/search/style/PageNavigation.style';

/**
 * 페이지네이션 컴포넌트의 Props
 */
interface PageNavigationProps {
  /** 현재 페이지 번호 (1부터 시작) */
  currentPage: number;

  /** 전체 페이지 수 */
  totalPages: number;

  /** 페이지 변경 시 호출되는 콜백 함수 */
  onPageChange: (page: number) => void;
}

/**
 * 페이지네이션 컴포넌트
 *
 * @remarks
 * - 1~5 페이지를 표시합니다.
 * - 이전/다음 버튼을 통해 페이지를 이동할 수 있습니다.
 * - 현재 페이지는 하이라이트 처리됩니다.
 * - 첫 페이지에서는 이전 버튼이, 마지막 페이지에서는 다음 버튼이 비활성화됩니다.
 *
 * @param props.currentPage - 현재 페이지 번호 (1부터 시작)
 * @param props.totalPages - 전체 페이지 수
 * @param props.onPageChange - 페이지 변경 시 호출되는 콜백
 */
const PageNavigation = ({ currentPage, totalPages, onPageChange }: PageNavigationProps) => {
  const maxVisiblePages = 5;
  const displayPages = Math.min(totalPages, maxVisiblePages);
  const pages = Array.from({ length: displayPages }, (_, i) => i + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={pageNavigationStyle.container}>
      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={handlePrevious}
        disabled={isFirstPage}
        className={pageNavigationStyle.arrowButton(isFirstPage)}
        aria-label="이전 페이지">
        <ArrowLeftIcon className="w-5 h-5" />
      </button>

      {/* 페이지 번호들 */}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={pageNavigationStyle.pageButton(page === currentPage)}
          aria-label={`${page}페이지`}
          aria-current={page === currentPage ? 'page' : undefined}>
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        type="button"
        onClick={handleNext}
        disabled={isLastPage}
        className={pageNavigationStyle.arrowButton(isLastPage)}
        aria-label="다음 페이지">
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default PageNavigation;
