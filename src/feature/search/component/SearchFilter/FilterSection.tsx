import { Fragment } from 'react';
import { SearchFilterStyle } from '../../style/SearchFilter.style';
import CheckIcon from '@/shared/assets/icon-check-password.svg?react';
import ArrowDownIcon from '@/shared/assets/icon-arrow-down.svg?react';
import clsx from 'clsx';

interface FilterSectionProps<T extends number | string> {
  title: string;
  items: Array<{ id: T; label: string }>;
  selectedItems: T[];
  isOpen: boolean;
  hasTwoColumns?: boolean;
  onToggle: () => void;
  onItemChange: (id: T, checked: boolean) => void;
  isLast?: boolean;
}

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
