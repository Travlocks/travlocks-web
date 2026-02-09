import { axiosInstance } from '@/shared/apis/axios';
import { extractErrorMessage, isErrorResponse, isSuccessResponse } from '@/shared/utils/apiErrorHandler';
import type {
  CategoryBlockListSuccessResponse,
  CategoryBlockListErrorResponse,
  CategoryBlock,
} from '../types/blockCategory.types';

// 카테고리별 블록 조회
export const getBlocksByCategory = async (
  cityId: number,
  categoryId: number,
): Promise<CategoryBlockListSuccessResponse> => {
  let responseData: CategoryBlockListSuccessResponse | CategoryBlockListErrorResponse;

  try {
    ({ data: responseData } = await axiosInstance.get<
      CategoryBlockListSuccessResponse | CategoryBlockListErrorResponse
    >('/vlocks', {
      params: {
        cityId,
        categoryId,
      },
    }));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '카테고리별 블록 조회 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<CategoryBlock[]>(responseData)) {
    throw new Error(responseData.errorMessage || '카테고리별 블록 조회에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// 인기 블록 조회
export const getPopularBlocks = async (cityId: number): Promise<CategoryBlockListSuccessResponse> => {
  let responseData: CategoryBlockListSuccessResponse | CategoryBlockListErrorResponse;

  try {
    ({ data: responseData } = await axiosInstance.get<
      CategoryBlockListSuccessResponse | CategoryBlockListErrorResponse
    >('/vlocks/popular', {
      params: {
        cityId,
      },
    }));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '인기 블록 조회 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<CategoryBlock[]>(responseData)) {
    throw new Error(responseData.errorMessage || '인기 블록 조회에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// 내가 생성한 블록 목록 조회
export const getCreatedBlocks = async (cityId: number): Promise<CategoryBlockListSuccessResponse> => {
  let responseData: CategoryBlockListSuccessResponse | CategoryBlockListErrorResponse;

  try {
    ({ data: responseData } = await axiosInstance.get<
      CategoryBlockListSuccessResponse | CategoryBlockListErrorResponse
    >('/vlocks/me', {
      params: {
        cityId,
      },
    }));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '내가 만든 블록 조회 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<CategoryBlock[]>(responseData)) {
    throw new Error(responseData.errorMessage || '내가 만든 블록 조회에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};
