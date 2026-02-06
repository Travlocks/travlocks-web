import { useState, useRef, useEffect } from 'react';
import { REGIONS, type Region, type DestinationCity, type DestinationCityId } from '@/shared/constants/destinationCity';
import { DropdownStyles } from '../styles/Dropdown.style';
import BackIcon from '@/shared/assets/icon-arrow-left.svg?react';
import PinIcon from '@/shared/assets/icon-pin.svg?react';
import DeleteIcon from '@/shared/assets/icon-x.svg?react';
import clsx from 'clsx';

const PLACEHOLDER_TEXT = '도시 또는 지역명을 직접 검색하거나 아래에서 선택해주세요';

interface DestinationCityDropdownProps {
  /**
   * 선택된 여행 도시 ID 목록이 변경될 때 호출되는 콜백입니다.
   *
   * @param onSelect 선택된 여행 도시 ID 목록이 변경될 때 호출되는 콜백입니다.
   */
  onSelect?: (destinationCityIds: DestinationCityId[]) => void;
}

/**
 * 여행 도시(도시/지역) 선택 드롭다운 컴포넌트입니다.
 *
 * @remarks
 * - 사용자는 상단 인풋 영역을 클릭하여 드롭다운을 열 수 있습니다.
 * - 먼저 권역(서울, 경기, 강원 등)을 선택한 뒤, 해당 권역의 도시를 선택합니다.
 * - 최대 2개의 도시까지 선택 가능하며, 선택된 도시는 태그 형태로 인풋 영역에 표시됩니다.
 * - 외부 영역을 클릭하면 드롭다운이 닫히며, 선택된 권역 상태는 초기화됩니다.
 */
const DestinationCityDropdown = ({ onSelect }: DestinationCityDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 open 여부
  const [selectedCities, setSelectedCities] = useState<DestinationCity[]>([]); // 선택된 도시
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null); // 선택된 권역
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 참조

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedRegion(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 인풋 영역 클릭 시 드롭다운 open/close
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // 권역 클릭 시 해당 권역의 도시 목록 표시
  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
  };

  // 권역 목록으로 돌아가기
  const handleBackToRegions = () => {
    setSelectedRegion(null);
  };

  /**
   * 도시 선택 시 호출되는 핸들러입니다.
   *
   * @param city 선택한 도시입니다.
   *
   * @remarks
   * - 최대 2개의 도시까지만 선택 가능합니다.
   * - 선택된 도시 배열이 변경되면 onSelect 콜백을 통해 상위로 ID 배열을 전달합니다.
   */
  const handleCitySelect = (city: DestinationCity) => {
    let newCities: DestinationCity[] = [];
    const excistCities = [...selectedCities];

    // 최대 2개의 도시까지만 선택 가능
    if (excistCities.length < 2) {
      newCities = [...excistCities, city];
    } else {
      return;
    }

    setSelectedCities(newCities);
    onSelect?.(newCities.map((city) => city.id));
  };

  // 도시 삭제 시 호출되는 핸들러
  const handleDeleteCity = (cityId: DestinationCityId) => {
    const newCities = selectedCities.filter((c) => c.id !== cityId);
    setSelectedCities(newCities);
    onSelect?.(newCities.map((city) => city.id));
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* 인풋/태그 영역 */}
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
                {' '}
                {/* 태그 클릭 시 인풋 영역 클릭 이벤트 방지 */}
                <span>{city.name.korean}</span>
                <div className={DropdownStyles.deleteIconWrapper} onClick={() => handleDeleteCity(city.id)}>
                  <DeleteIcon className={DropdownStyles.deleteIcon} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className={clsx(DropdownStyles.dropdownContainer, 'p-[25px_36px]')}>
          {/* 권역 선택 영역 */}
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

          {/* 도시 선택 영역 */}
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
