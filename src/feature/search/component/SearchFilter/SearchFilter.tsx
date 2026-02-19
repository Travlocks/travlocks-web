import { useState, useCallback } from 'react';
import FilterSection from './FilterSection';
import { SearchFilterStyle } from '../../style/SearchFilter.style';
import { REGIONS } from '@/shared/constants/destinationCity';
import { TRIP_DURATION } from '@/shared/constants/tripDuration';
import { TRAVEL_THEME } from '@/shared/constants/travelTheme';
import { TRANSPORT_TYPE } from '@/shared/constants/transportType';
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

  // 여행지 필터 변경 핸들러 (권역 이름 사용)
  const handleRegionChange = useCallback(
    (id: string, checked: boolean) => {
      const newCities = checked ? [...filters.cities, id] : filters.cities.filter((city) => city !== id);

      onFilterChange({
        ...filters,
        cities: newCities,
      });
    },
    [filters, onFilterChange],
  );

  // 여행 기간 필터 변경 핸들러 (MAPPING 필요: 1 -> ONE_DAY)
  const handleTripDurationChange = useCallback(
    (id: string, checked: boolean) => {
      const newTripDays = checked ? [...filters.tripDays, id] : filters.tripDays.filter((day) => day !== id);

      onFilterChange({
        ...filters,
        tripDays: newTripDays,
      });
    },
    [filters, onFilterChange],
  );

  // 여행 테마 필터 변경 핸들러 (테마 이름 사용)
  const handleTravelThemeChange = useCallback(
    (id: string, checked: boolean) => {
      const newThemes = checked ? [...filters.themes, id] : filters.themes.filter((theme) => theme !== id);

      onFilterChange({
        ...filters,
        themes: newThemes,
      });
    },
    [filters, onFilterChange],
  );

  // 이동 수단 필터 변경 핸들러 (영문 대문자 키 사용: WALK, TRANSIT, CAR) -> API 스펙엔 한글 '도보', '차량', '대중교통' 요구됨
  // 요청사항: '도보', '차량', '대중교통' 이 값이 그대로 parameter로 들어가.
  const handleTransportTypeChange = useCallback(
    (id: string, checked: boolean) => {
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

  // 필터 데이터 준비 - ID를 API 파라미터 값으로 매핑

  // 1. 여행지: 권역 이름 그 자체 ('서울', '경기'...)
  const regionItems = REGIONS.map((region) => ({
    id: region.name.korean,
    label: region.name.korean,
  }));

  // 2. 여행 기간: ONE_DAY, TWO_DAYS 등 매핑
  const durationMapping: Record<number, string> = {
    1: 'ONE_DAY',
    2: 'TWO_DAYS',
    3: 'THREE_DAYS',
    4: 'FOUR_DAYS',
    5: 'FIVE_DAYS',
  };
  const durationItems = TRIP_DURATION.map((duration) => ({
    id: durationMapping[duration.id],
    label: duration.label,
  }));

  // 3. 여행 테마: 테마 이름 ('자연', '문화'...)
  const themeItems = TRAVEL_THEME.map((theme) => ({
    id: theme.name.korean,
    label: theme.name.korean,
  }));

  // 4. 이동 수단: '도보', '차량', '대중교통'
  const transportItems = TRANSPORT_TYPE.map((transport) => ({
    id: transport.name.korean,
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
          selectedItems={filters.cities}
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
          selectedItems={filters.tripDays}
          isOpen={openSections.duration}
          onToggle={() => handleSectionToggle('duration')}
          onItemChange={handleTripDurationChange}
        />
      </div>

      <div className={SearchFilterStyle.wrapper}>
        <FilterSection
          title="여행 테마"
          items={themeItems}
          selectedItems={filters.themes}
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
