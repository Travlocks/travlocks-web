import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';
import type { BlockRegion } from './blockRegion.types';

// 기본 블록 카테고리 아이템 - /api/v1/vlocks/categories - 기본 블록 카테고리 조회
export interface BlockCategory {
  id: number;
  name: string;
  stayHours: number;
}

// 기본 블록 카테고리 조회 성공 응답 - /api/v1/vlocks/categories - 기본 블록 카테고리 조회
export type BlockCategoryListSuccessResponse = SuccessPayload<{
  categories: BlockCategory[];
}>;

// 기본 블록 카테고리 조회 에러 응답 - /api/v1/vlocks/categories - 기본 블록 카테고리 조회
export type BlockCategoryListErrorResponse = ErrorPayload<null>;

// 카테고리별 블록 조회용 도시 정보 - /api/v1/vlocks - 카테고리 블록 조회
export interface BlockCity {
  id: number;
  name: string;
  region: BlockRegion;
}

// 카테고리별 블록 아이템 - /api/v1/vlocks - 카테고리 블록 조회
export interface CategoryBlock {
  id: number;
  memberId: number;
  blockCategory: BlockCategory;
  city: BlockCity;
  name: string;
  address: string;
  memo: string;
  coverImgUrl: string;
  linkUrl: string;
  latitude: number;
  longitude: number;
  usageCount: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// 카테고리별 블록 조회 성공 응답 - /api/v1/vlocks - 카테고리 블록 조회
export type CategoryBlockListSuccessResponse = SuccessPayload<CategoryBlock[]>;

// 카테고리별 블록 조회 에러 응답 - /api/v1/vlocks - 카테고리 블록 조회
export type CategoryBlockListErrorResponse = ErrorPayload<CategoryBlock[]>;
