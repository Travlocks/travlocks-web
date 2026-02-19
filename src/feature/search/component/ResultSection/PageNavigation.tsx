import ArrowLeftIcon from '@/shared/assets/icon-arrow-left.svg?react';
import ArrowRightIcon from '@/shared/assets/icon-arrow-right.svg?react';
import { PageNavigationStyle } from '@/feature/search/style/PageNavigation.style';

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
 * - 5개 단위로 페이지 번호를 표시합니다 (1~5, 6~10, ...).
 * - 전체 페이지 수에 따라 다음 버튼 활성화 여부를 결정합니다.
 *
 * @param props.currentPage - 현재 페이지 번호 (1부터 시작)
 * @param props.totalPages - 전체 페이지 수
 * @param props.onPageChange - 페이지 변경 시 호출되는 콜백
 */
const PageNavigation = ({ currentPage, totalPages, onPageChange }: PageNavigationProps) => {
  const maxVisiblePages = 5;
  const currentBlock = Math.ceil(currentPage / maxVisiblePages);
  const startPage = (currentBlock - 1) * maxVisiblePages + 1;

  // 실제 마지막 페이지까지만 표시
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

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

  if (totalPages === 0) return null;

  return (
    <nav className={PageNavigationStyle.container}>
      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={handlePrevious}
        disabled={isFirstPage}
        className={PageNavigationStyle.arrowButton(isFirstPage)}
        aria-label="이전 페이지">
        <ArrowLeftIcon className="w-5 h-5" />
      </button>

      {/* 페이지 번호들 */}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={PageNavigationStyle.pageButton(page === currentPage)}
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
        className={PageNavigationStyle.arrowButton(isLastPage)}
        aria-label="다음 페이지">
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default PageNavigation;
