import ArrowLeftIcon from '@/shared/assets/icon-arrow-left.svg?react';
import ArrowRightIcon from '@/shared/assets/icon-arrow-right.svg?react';
import { PageNavigationStyle } from '@/feature/search/style/PageNavigation.style';

/**
 * 페이지네이션 컴포넌트의 Props
 */
interface PageNavigationProps {
  /** 현재 페이지 번호 (1부터 시작) */
  currentPage: number;

  /** 페이지 변경 시 호출되는 콜백 함수 */
  onPageChange: (page: number) => void;
}

/**
 * 페이지네이션 컴포넌트
 *
 * @remarks
 * - 5개 단위로 페이지 번호를 표시합니다 (1~5, 6~10, ...).
 * - 전체 페이지 수를 모르므로 다음 버튼은 항상 활성화됩니다.
 * - 결과가 없는 페이지에 도달하면 상위 컴포넌트에서 빈 결과 화면을 보여줍니다.
 *
 * @param props.currentPage - 현재 페이지 번호 (1부터 시작)
 * @param props.onPageChange - 페이지 변경 시 호출되는 콜백
 */
const PageNavigation = ({ currentPage, onPageChange }: PageNavigationProps) => {
  const maxVisiblePages = 5;
  const currentBlock = Math.ceil(currentPage / maxVisiblePages);
  const startPage = (currentBlock - 1) * maxVisiblePages + 1;

  const pages = Array.from({ length: maxVisiblePages }, (_, i) => startPage + i);

  const isFirstPage = currentPage === 1;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

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
        className={PageNavigationStyle.arrowButton(false)}
        aria-label="다음 페이지">
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default PageNavigation;
