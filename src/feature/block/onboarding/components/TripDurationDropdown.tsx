import { useState, useRef, useEffect } from 'react';
import { TRIP_DURATION, type TripDuration } from '@/shared/constants/tripDuration';
import DropdownIcon from '@/shared/assets/icon-arrow-down.svg?react';
import { DropdownStyle } from '../styles/Dropdown.style';
import clsx from 'clsx';

const PLACEHOLDER_TEXT = '여행기간 선택';

interface TripDurationDropdownProps {
  /**
   * 여행 기간이 선택되었을 때 호출되는 콜백입니다.
   *
   * @param trip 선택된 여행 기간 정보입니다.
   */
  onSelect?: (trip: TripDuration) => void;
}

const TripDurationDropdown = ({ onSelect }: TripDurationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
  const [selectedDuration, setSelectedDuration] = useState<TripDuration | null>(null); // 선택된 여행 기간
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 참조

  // 외부 클릭 시 드롭다운 닫기
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

  // input 클릭 시 드롭다운 열림/닫힘
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  /**
   * 특정 여행 기간이 선택되었을 때 호출되는 핸들러입니다.
   *
   * @param duration 선택된 여행 기간 정보입니다.
   *
   * @remarks
   * 선택된 기간을 상태에 저장하고, 드롭다운을 닫은 뒤 onSelect 콜백을 호출합니다.
   */
  const handleSelect = (duration: TripDuration) => {
    setSelectedDuration(duration);
    setIsOpen(false);
    onSelect?.(duration);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className={clsx(DropdownStyle.inputField, 'justify-between')} onClick={handleToggle}>
        <span className={selectedDuration ? DropdownStyle.selectedText : DropdownStyle.placeholder}>
          {selectedDuration?.label || PLACEHOLDER_TEXT}
        </span>
        <DropdownIcon className={DropdownStyle.dorpdownIcon(isOpen)} />
      </div>

      {isOpen && (
        <div className={DropdownStyle.dropdownContainer}>
          {TRIP_DURATION.map((duration) => (
            <div
              key={duration.id}
              className={DropdownStyle.menuItem(selectedDuration?.id === duration.id)}
              onClick={() => handleSelect(duration)}>
              <span>{duration.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripDurationDropdown;
