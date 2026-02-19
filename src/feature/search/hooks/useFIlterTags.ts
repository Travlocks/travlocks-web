import { useMemo } from 'react';
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

    // 여행지 필터 (cities 배열에 권역 이름이 저장됨)
    filters.cities.forEach((cityName) => {
      tags.push({
        type: 'cities',
        id: cityName,
        label: cityName,
      });
    });

    // 여행기간 필터 (tripDays에 ONE_DAY 등이 저장됨 -> 라벨로 변환 필요)
    // TRIP_DURATION 배열에서 id 매핑을 찾아서 라벨을 가져옵니다.
    const durationLabelMap: Record<string, string> = {
      ONE_DAY: '당일치기',
      TWO_DAYS: '1박 2일',
      THREE_DAYS: '2박 3일',
      FOUR_DAYS: '3박 4일',
      FIVE_DAYS: '4박 5일',
    };
    filters.tripDays.forEach((durationKey) => {
      tags.push({
        type: 'tripDays',
        id: durationKey,
        label: durationLabelMap[durationKey] || durationKey,
      });
    });

    // 여행테마 필터 (themes에 테마 이름이 저장됨)
    filters.themes.forEach((themeName) => {
      tags.push({
        type: 'themes',
        id: themeName,
        label: themeName,
      });
    });

    // 이동성향(교통편) 필터 (transportTypes에 교통편 이름이 저장됨)
    filters.transportTypes.forEach((transportName) => {
      tags.push({
        type: 'transportTypes',
        id: transportName,
        label: transportName,
      });
    });

    return tags;
  }, [filters]);
}
