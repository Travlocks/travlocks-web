import { Fragment } from 'react';
import { SearchFilterStyle } from '../../style/SearchFilter.style';
import CheckIcon from '@/shared/assets/icon-check-password.svg?react';
import ArrowDownIcon from '@/shared/assets/icon-arrow-down.svg?react';
import clsx from 'clsx';

/**
 * 필터 섹션 컴포넌트의 Props
 *
 * @typeParam T - 필터 항목의 ID 타입 (number 또는 string)
 */
interface FilterSectionProps<T extends number | string> {
  /** 섹션 제목 */
  title: string;

  /** 필터 항목 목록 */
  items: Array<{ id: T; label: string }>;

  /** 선택된 항목의 ID 배열 */
  selectedItems: T[];

  /** 섹션 펼쳐짐 여부 */
  isOpen: boolean;

  /** 2열 레이아웃 사용 여부 */
  hasTwoColumns?: boolean;

  /** 섹션 토글 핸들러 */
  onToggle: () => void;

  /** 항목 선택 변경 핸들러 */
  onItemChange: (id: T, checked: boolean) => void;

  /** 마지막 섹션 여부 (구분선 표시용) */
  isLast?: boolean;
}

/**
 * 검색 필터의 각 섹션을 표시하는 컴포넌트
 *
 * @remarks
 * - 체크박스 리스트로 다중 선택을 지원합니다.
 * - 화살표 아이콘을 클릭하여 섹션을 펼치거나 접을 수 있습니다.
 * - hasTwoColumns가 true일 경우 2열 그리드 레이아웃으로 표시됩니다.
 * - 마지막 섹션이 아니면 하단에 구분선이 표시됩니다.
 *
 * @typeParam T - 필터 항목의 ID 타입
 * @param props - FilterSectionProps
 */
const FilterSection = <T extends number | string>({
  title,
  items,
  selectedItems,
  isOpen,
  hasTwoColumns = false,
  onToggle,
  onItemChange,
  isLast = false,
}: FilterSectionProps<T>) => {
  return (
    <Fragment>
      <div className={SearchFilterStyle.section}>
        {/* 헤더 */}
        <div className={SearchFilterStyle.sectionHeader}>
          <div className={SearchFilterStyle.sectionTitle}>{title}</div>
          <ArrowDownIcon
            className={clsx(
              SearchFilterStyle.sectionArrow,
              isOpen ? SearchFilterStyle.sectionArrowOpen : SearchFilterStyle.sectionArrowClosed,
            )}
            onClick={onToggle}
          />
        </div>

        {/* 체크박스 그룹 */}
        <div
          className={clsx(
            SearchFilterStyle.checkboxGroup(hasTwoColumns),
            isOpen ? SearchFilterStyle.checkboxGroupVisible : SearchFilterStyle.checkboxGroupHidden,
          )}>
          {items.map((item) => (
            <label key={item.id} className={SearchFilterStyle.checkboxItem}>
              <div className={SearchFilterStyle.checkboxWrapper}>
                <input
                  className={SearchFilterStyle.checkbox}
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={(e) => onItemChange(item.id, e.target.checked)}
                />
                <CheckIcon className={SearchFilterStyle.checkIcon} />
              </div>
              <span className={SearchFilterStyle.checkboxLabel}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 구분선 */}
      {!isLast && (
        <div
          className={clsx(
            SearchFilterStyle.line,
            isOpen ? SearchFilterStyle.lineVisible : SearchFilterStyle.lineHidden,
          )}
        />
      )}
    </Fragment>
  );
};

export default FilterSection;
