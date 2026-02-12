import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';

// 지역 내 도시 정보 - /api/v1/regions - 지역 목록 조회
export interface City {
  cityId: number;
  cityName: string;
  latitude: number;
  longitude: number;
}

// 지역 정보 - /api/v1/regions - 지역 목록 조회
export interface Region {
  regionId: number;
  regionName: string;
  cities: City[];
}

// 카테고리별 블록 조회용 지역 정보 - /api/v1/vlocks - 카테고리 블록 조회
export interface BlockRegion {
  id: number;
  name: string;
}

// 지역 목록 조회 성공 응답 - /api/v1/regions - 지역 목록 조회
export type RegionListSuccessResponse = SuccessPayload<{
  regions: Region[];
}>;

// 지역 목록 조회 에러 응답 - /api/v1/regions - 지역 목록 조회
export type RegionListErrorResponse = ErrorPayload<null>;
