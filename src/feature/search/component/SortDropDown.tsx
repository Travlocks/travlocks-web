import { useState, useRef, useEffect } from 'react';
import { type SortOption, SORT_OPTIONS } from '@/feature/search/types/searchTemplate.types';
import { DropdownStyle } from '@/feature/search/style/Dropdown.style';
import ArrowDownIcon from '@/shared/assets/icon-arrow-down.svg?react';

/**
 * 정렬 옵션 드롭다운 컴포넌트의 Props
 */
interface SortDropDownProps {
  /** 현재 선택된 정렬 옵션 */
  value: SortOption;

  /** 정렬 옵션 변경 시 호출되는 콜백 함수 */
  onChange: (value: SortOption) => void;
}

/**
 * 템플릿 목록의 정렬 순서를 선택하는 드롭다운 컴포넌트
 *
 * @remarks
 * - 별점순, 인기순, 최신순 중 하나를 선택할 수 있습니다.
 * - 드롭다운 외부 클릭 시 자동으로 닫힙니다.
 * - 선택된 옵션은 시각적으로 강조됩니다.
 *
 * @param props - SortDropDownProps
 */
const SortDropDown = ({ value, onChange }: SortDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 감지하여 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 옵션 선택 핸들러
  const handleSelect = (option: SortOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={DropdownStyle.container} ref={dropdownRef}>
      <button type="button" className={DropdownStyle.button} onClick={() => setIsOpen(!isOpen)}>
        <span>{SORT_OPTIONS[value]}</span>
        <div className={DropdownStyle.arrowIconWrapper}>
          <ArrowDownIcon className={DropdownStyle.arrowIcon(isOpen)} />
        </div>
      </button>

      {isOpen && (
        <div className={DropdownStyle.menu}>
          {Object.entries(SORT_OPTIONS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={DropdownStyle.menuItem(value === key)}
              onClick={() => handleSelect(key as SortOption)}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropDown;
