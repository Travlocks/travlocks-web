import { useState, useRef, useEffect } from 'react';
import { REGIONS, type Region, type DestinationCity, type DestinationCityId } from '@/shared/constants/destinationCity';
import { DropdownStyles } from '../styles/Dropdown.style';
import BackIcon from '@/shared/assets/icon-arrow-left.svg?react';
import PinIcon from '@/shared/assets/icon-pin.svg?react';
import DeleteIcon from '@/shared/assets/icon-x.svg?react';
import clsx from 'clsx';

const PLACEHOLDER_TEXT = '도시 또는 지역명을 직접 검색하거나 아래에서 선택해주세요';

interface DestinationCityDropdownProps {
  onSelect?: (cities: DestinationCity[]) => void;
}

const DestinationCityDropdown = ({ onSelect }: DestinationCityDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState<DestinationCity[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedRegion(null); // 드롭다운 닫을 때 지역 선택 초기화
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

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
  };

  const handleBackToRegions = () => {
    setSelectedRegion(null);
  };

  const handleCitySelect = (city: DestinationCity) => {
    let newCities: DestinationCity[] = [];
    const excistCities = [...selectedCities];

    if (excistCities.length < 2) {
      newCities = [...excistCities, city];
    } else {
      return;
    }

    setSelectedCities(newCities);
    onSelect?.(newCities);
  };

  const handleDeleteCity = (cityId: DestinationCityId) => {
    const newCities = selectedCities.filter((c) => c.id !== cityId);
    setSelectedCities(newCities);
    onSelect?.(newCities);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className={clsx(DropdownStyles.inputField, 'gap-[12px]')} onClick={handleToggle}>
        {selectedCities.length === 0 && (
          <>
            <PinIcon />
            <span className={DropdownStyles.placeholder}>{PLACEHOLDER_TEXT}</span>
          </>
        )}
        {selectedCities.length > 0 && (
          <div className="flex flex-row gap-[12px] flex-wrap">
            {selectedCities.map((city) => (
              <div key={city.id} className={DropdownStyles.tag} onClick={(e) => e.stopPropagation()}>
                <span>{city.name.korean}</span>
                <div className={DropdownStyles.deleteIconWrapper} onClick={() => handleDeleteCity(city.id)}>
                  <DeleteIcon className={DropdownStyles.deleteIcon} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <div className={clsx(DropdownStyles.dropdownContainer, 'p-[25px_36px]')}>
          {!selectedRegion && (
            <div className="flex flex-col gap-[12px]">
              <div className={DropdownStyles.header}>
                <span>추천 여행지</span>
              </div>
              <div className="flex flex-row flex-wrap gap-[20px]">
                {REGIONS.map((region) => (
                  <button key={region.id} className={DropdownStyles.button} onClick={() => handleRegionClick(region)}>
                    {region.name.korean}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedRegion && (
            <div className="flex flex-col gap-[12px]">
              <div className={DropdownStyles.header}>
                <div onClick={handleBackToRegions} className={DropdownStyles.backIconWrapper}>
                  <BackIcon className={DropdownStyles.backIcon} />
                </div>
                <span>{selectedRegion.name.korean}</span>
              </div>

              <div className="flex flex-row flex-wrap gap-[20px]">
                {selectedRegion.cities.map((city) => (
                  <button key={city.id} className={DropdownStyles.button} onClick={() => handleCitySelect(city)}>
                    {city.name.korean}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationCityDropdown;
