import { useState, useRef, useEffect } from 'react';
import { TRIP_DURATION, type TripDuration } from '@/shared/constants/tripDuration';
import DropdownIcon from '@/shared/assets/travel-onboarding/icon-dropdown.svg?react';
import { DropdownStyles } from '../styles/Dropdown.style';

const PLACEHOLDER_TEXT = '여행기간 선택';

interface TripDurationDropdownProps {
  onSelect?: (duration: TripDuration) => void;
}

const TripDurationDropdown = ({ onSelect }: TripDurationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<TripDuration | null>(null);
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

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (duration: TripDuration) => {
    setSelectedDuration(duration);
    setIsOpen(false);
    onSelect?.(duration);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className={DropdownStyles.inputField} onClick={handleToggle}>
        <span className={selectedDuration ? DropdownStyles.selectedText : DropdownStyles.placeholder}>
          {selectedDuration?.label || PLACEHOLDER_TEXT}
        </span>
        <DropdownIcon className={DropdownStyles.dorpdownIcon(isOpen)} />
      </div>

      {isOpen && (
        <div className={DropdownStyles.dropdownContainer}>
          {TRIP_DURATION.map((duration) => (
            <div
              key={duration.id}
              className={DropdownStyles.menuItem(selectedDuration?.id === duration.id)}
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
