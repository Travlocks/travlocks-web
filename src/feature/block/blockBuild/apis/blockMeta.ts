import { axiosInstance } from '@/shared/apis/axios';
import { extractErrorMessage, isErrorResponse, isSuccessResponse } from '@/shared/utils/apiErrorHandler';
import type {
  RegionListErrorResponse,
  RegionListSuccessResponse,
  VlockCategoryListErrorResponse,
  VlockCategoryListSuccessResponse,
} from '../types/blockMeta.types';

// 기본 블록 카테고리 목록 조회
export const getVlockCategories = async (): Promise<VlockCategoryListSuccessResponse> => {
  let responseData: VlockCategoryListSuccessResponse | VlockCategoryListErrorResponse;

  try {
    ({ data: responseData } = await axiosInstance.get<
      VlockCategoryListSuccessResponse | VlockCategoryListErrorResponse
    >('/vlocks/categories'));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '블록 카테고리 조회 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<null>(responseData)) {
    throw new Error(responseData.errorMessage || '블록 카테고리 조회에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// 지역 목록 조회
export const getRegions = async (): Promise<RegionListSuccessResponse> => {
  let responseData: RegionListSuccessResponse | RegionListErrorResponse;

  try {
    ({ data: responseData } = await axiosInstance.get<RegionListSuccessResponse | RegionListErrorResponse>('/regions'));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '지역 목록 조회 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<null>(responseData)) {
    throw new Error(responseData.errorMessage || '지역 목록 조회에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};
