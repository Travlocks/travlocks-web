import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';

// 기본 블록 카테고리 아이템
export interface VlockCategory {
  id: number;
  name: string;
  stayHours: number;
}

// 기본 블록 카테고리 조회 성공 응답
export type VlockCategoryListSuccessResponse = SuccessPayload<{
  categories: VlockCategory[];
}>;

// 기본 블록 카테고리 조회 에러 응답
export type VlockCategoryListErrorResponse = ErrorPayload<null>;

// 지역 내 도시 정보
export interface City {
  cityId: number;
  cityName: string;
  latitude: number;
  longitude: number;
}

// 지역 정보
export interface Region {
  regionId: number;
  regionName: string;
  cities: City[];
}

// 지역 목록 조회 성공 응답
export type RegionListSuccessResponse = SuccessPayload<{
  regions: Region[];
}>;

// 지역 목록 조회 에러 응답
export type RegionListErrorResponse = ErrorPayload<null>;
