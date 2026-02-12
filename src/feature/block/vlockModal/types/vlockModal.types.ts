import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';

/**
 * Vlock 생성/수정 시 공통으로 사용하는 기본 DTO
 */
export interface VlockModalBaseDto {
  name: string; // 블록 이름
  address: string; // 주소(도로명 주소 우선, 도로명 주소 없을 시 지번 주소)
  categoryId: number; // 카테고리 ID
  cityId: number; // 도시 ID
  memo?: string; // 메모(선택)
  latitude: number; // 위도
  longitude: number; // 경도
}

/**
 * Vlock 생성 요청 DTO
 */
export type CreateVlockModalRequestDto = VlockModalBaseDto;

/**
 * Vlock 수정 요청 DTO
 */
export interface UpdateVlockModalRequestDto extends VlockModalBaseDto {
  deleteCoverImg: boolean; // Note: API uses 'deleteCoverImg', not 'deleteCoverImage'
  isPublic: boolean;
}

/**
 * Vlock 생성 시 폼 상태에서 사용하는 타입
 * (컴포넌트 내부에서 File 객체 포함)
 */
export interface CreateVlockModalFormData extends VlockModalBaseDto {
  coverImage: File | null;
}

/**
 * Vlock 수정 시 폼 상태에서 사용하는 타입
 * (컴포넌트 내부에서 File 객체 포함)
 */
export interface UpdateVlockModalFormData extends VlockModalBaseDto {
  coverImage: File | null;
  coverImgUrl?: string | null; // For existing image preview
  deleteCoverImage: boolean;
  isPublic: boolean;
  city?: { id: number }; // For handling API response structure where cityId is nested
}

/**
 * 생성/수정 요청을 구분하기 위한 유니온 타입
 */
export type VlockModalRequestDto =
  | { type: 'create'; data: CreateVlockModalFormData }
  | { type: 'edit'; data: UpdateVlockModalFormData };

/**
 * Vlock 카테고리 정보
 */
export interface VlockCategory {
  id: number;
  name: string;
  stayHours: number;
}

/**
 * 권역 정보
 */
export interface Region {
  id: number;
  name: string;
}

/**
 * 도시 정보
 */

export interface City {
  id: number;
  name: string;
  region: Region;
}

/**
 * Vlock 상세 데이터 (API 응답 데이터 구조)
 */
export interface VlockData {
  id: number;
  memberId: number;
  vlockCategory: VlockCategory;
  city: City;
  name: string;
  address: string;
  memo: string | null;
  coverImgUrl: string;
  linkUrl?: string | null;
  latitude: number;
  longitude: number;
  usageCount: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * 성공/에러 응답 타입 정의
 */
export type CreateVlockModalSuccessResponseDto = SuccessPayload<VlockData>;
export type UpdateVlockModalSuccessResponseDto = SuccessPayload<VlockData>;
export type DeleteVlockModalSuccessResponseDto = SuccessPayload<null>;

export type CreateVlockModalErrorResponseDto = ErrorPayload<string>;
export type UpdateVlockModalErrorResponseDto = ErrorPayload<string>;
export type DeleteVlockModalErrorResponseDto = ErrorPayload<string>;

/**
 * 최종 응답 타입 (성공 또는 실패)
 */
export type CreateVlockModalResponseDto = CreateVlockModalSuccessResponseDto | CreateVlockModalErrorResponseDto;
export type UpdateVlockModalResponseDto = UpdateVlockModalSuccessResponseDto | UpdateVlockModalErrorResponseDto;
export type DeleteVlockModalResponseDto = DeleteVlockModalSuccessResponseDto | DeleteVlockModalErrorResponseDto;
