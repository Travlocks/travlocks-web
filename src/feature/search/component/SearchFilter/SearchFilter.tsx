import { useState, useCallback } from 'react';
import FilterSection from './FilterSection';
import { SearchFilterStyle } from '../../style/SearchFilter.style';
import { REGIONS, type RegionId } from '@/shared/constants/destinationCity';
import { TRIP_DURATION, type TripDurationId } from '@/shared/constants/tripDuration';
import { TRAVEL_THEME, type TravleThemeId } from '@/shared/constants/travelTheme';
import { TRANSPORT_TYPE, type TransportTypeId } from '@/shared/constants/transportType';
import type { FilterState } from '../../types/searchTemplate.types';

/**
 * 검색 필터 컴포넌트의 Props
 */
interface SearchFilterProps {
  /** 현재 필터 상태 */
  filters: FilterState;

  /** 필터 변경 시 호출되는 콜백 함수 */
  onFilterChange: (filters: FilterState) => void;

  /** 필터 초기화 시 호출되는 콜백 함수 */
  onReset: () => void;
}

/**
 * 템플릿 탐색 페이지의 검색 필터 컴포넌트
 *
 * @remarks
 * - 여행지, 여행 기간, 여행 테마, 이동 수단의 4가지 필터 섹션을 제공합니다.
 * - 각 섹션은 토글하여 펼치거나 접을 수 있습니다.
 * - 초기화 버튼으로 모든 필터를 한 번에 제거할 수 있습니다.
 * - 다중 선택이 가능하며, 선택 상태는 체크박스로 표시됩니다.
 *
 * @param props - SearchFilterProps
 */
const SearchFilter = ({ filters, onFilterChange, onReset }: SearchFilterProps) => {
  const [openSections, setOpenSections] = useState({
    region: true,
    duration: true,
    theme: true,
    transport: true,
  });

  // 섹션 토글 핸들러
  const handleSectionToggle = useCallback((section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  // 여행지 필터 변경 핸들러
  const handleRegionChange = useCallback(
    (id: RegionId, checked: boolean) => {
      const newRegions = checked ? [...filters.regions, id] : filters.regions.filter((regionId) => regionId !== id);

      onFilterChange({
        ...filters,
        regions: newRegions,
      });
    },
    [filters, onFilterChange],
  );

  // 여행 기간 필터 변경 핸들러
  const handleTripDurationChange = useCallback(
    (id: TripDurationId, checked: boolean) => {
      const newTripDurations = checked
        ? [...filters.tripDurations, id]
        : filters.tripDurations.filter((durationId) => durationId !== id);

      onFilterChange({
        ...filters,
        tripDurations: newTripDurations,
      });
    },
    [filters, onFilterChange],
  );

  // 여행 테마 필터 변경 핸들러
  const handleTravelThemeChange = useCallback(
    (id: TravleThemeId, checked: boolean) => {
      const newTravelThemes = checked
        ? [...filters.travelThemes, id]
        : filters.travelThemes.filter((themeId) => themeId !== id);

      onFilterChange({
        ...filters,
        travelThemes: newTravelThemes,
      });
    },
    [filters, onFilterChange],
  );

  // 이동 수단 필터 변경 핸들러
  const handleTransportTypeChange = useCallback(
    (id: TransportTypeId, checked: boolean) => {
      const newTransportTypes = checked
        ? [...filters.transportTypes, id]
        : filters.transportTypes.filter((transportTypeId) => transportTypeId !== id);

      onFilterChange({
        ...filters,
        transportTypes: newTransportTypes,
      });
    },
    [filters, onFilterChange],
  );

  // 리셋 핸들러
  const handleReset = useCallback(() => {
    onReset();
  }, [onReset]);

  // 필터 데이터 준비
  const regionItems = REGIONS.map((region) => ({
    id: region.id,
    label: region.name.korean,
  }));

  const durationItems = TRIP_DURATION.map((duration) => ({
    id: duration.id,
    label: duration.label,
  }));

  const themeItems = TRAVEL_THEME.map((theme) => ({
    id: theme.id,
    label: theme.name.korean,
  }));

  const transportItems = TRANSPORT_TYPE.map((transport) => ({
    id: transport.id,
    label: transport.name.korean,
  }));

  return (
    <div className={SearchFilterStyle.container}>
      {/* 필터 헤더 */}
      <div className={SearchFilterStyle.filterHeader}>
        <div className={SearchFilterStyle.filterHeaderTitle}>검색 필터</div>
        <button type="button" onClick={handleReset} className={SearchFilterStyle.filterHeaderReset}>
          초기화
        </button>
      </div>
      <div className={SearchFilterStyle.line} />

      {/* 필터 섹션 */}
      <div className={SearchFilterStyle.wrapper}>
        <FilterSection
          title="여행지"
          items={regionItems}
          selectedItems={filters.regions}
          isOpen={openSections.region}
          onToggle={() => handleSectionToggle('region')}
          onItemChange={handleRegionChange}
          hasTwoColumns={true}
        />
      </div>

      <div className={SearchFilterStyle.wrapper}>
        <FilterSection
          title="여행 기간"
          items={durationItems}
          selectedItems={filters.tripDurations}
          isOpen={openSections.duration}
          onToggle={() => handleSectionToggle('duration')}
          onItemChange={handleTripDurationChange}
        />
      </div>

      <div className={SearchFilterStyle.wrapper}>
        <FilterSection
          title="여행 테마"
          items={themeItems}
          selectedItems={filters.travelThemes}
          isOpen={openSections.theme}
          onToggle={() => handleSectionToggle('theme')}
          onItemChange={handleTravelThemeChange}
        />
      </div>

      <div className={SearchFilterStyle.wrapper}>
        <FilterSection
          title="이동 수단"
          items={transportItems}
          selectedItems={filters.transportTypes}
          isOpen={openSections.transport}
          onToggle={() => handleSectionToggle('transport')}
          onItemChange={handleTransportTypeChange}
          isLast={true}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
