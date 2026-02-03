import { useState, useRef, useEffect } from 'react';
import { type SortOption, SORT_OPTIONS } from '@/feature/search/types/searchTemplate.types';
import { DropdownStyle } from '@/feature/search/style/Dropdown.style';
import ArrowDownIcon from '@/shared/assets/icon-arrow-down.svg?react';

interface SortDropDownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortDropDown = ({ value, onChange }: SortDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
