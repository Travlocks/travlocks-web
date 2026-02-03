import { useMemo } from 'react';
import { REGION_MAP } from '@/shared/constants/destinationCity';
import { TRIP_DURATION_MAP } from '@/shared/constants/tripDuration';
import { TRAVEL_THEME_MAP } from '@/shared/constants/travelTheme';
import { TRANSPORT_TYPE_MAP } from '@/shared/constants/transportType';
import type { FilterState, FilterTag } from '../types/searchTemplate.types';

/**
 * 필터 상태를 태그 배열로 변환하는 커스텀 훅
 *
 * @remarks
 * - 선택된 필터들을 사용자가 볼 수 있는 태그 형태로 변환합니다.
 * - 각 태그는 제거 시 필요한 type과 id 정보를 포함합니다.
 *
 * @param filters - 현재 필터 상태
 * @returns 태그 배열
 */
export function useFilterTags(filters: FilterState): FilterTag[] {
  return useMemo(() => {
    const tags: FilterTag[] = [];

    // 여행지 필터
    filters.regions.forEach((regionId) => {
      const region = REGION_MAP[regionId];
      if (region) {
        tags.push({
          type: 'region',
          id: regionId,
          label: region.name.korean,
        });
      }
    });

    // 여행기간 필터
    filters.tripDurations.forEach((durationId) => {
      const duration = TRIP_DURATION_MAP[durationId];
      if (duration) {
        tags.push({
          type: 'tripDuration',
          id: durationId,
          label: duration.label,
        });
      }
    });

    // 여행테마 필터
    filters.travelThemes.forEach((themeId) => {
      const theme = TRAVEL_THEME_MAP[themeId];
      if (theme) {
        tags.push({
          type: 'travelTheme',
          id: themeId,
          label: theme.name.korean,
        });
      }
    });

    // 이동성향(교통편) 필터
    filters.transportTypes.forEach((transportTypeId) => {
      const transportType = TRANSPORT_TYPE_MAP[transportTypeId];
      if (transportType) {
        tags.push({
          type: 'transportType',
          id: transportTypeId,
          label: transportType.name.korean,
        });
      }
    });

    return tags;
  }, [filters]);
}
