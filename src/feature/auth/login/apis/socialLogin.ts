import { axiosInstance, type CustomAxiosRequestConfig } from '@/shared/apis/axios';
import type {
  RequestGoogleLoginDto,
  RequestNaverLoginDto,
  SuccessGoogleLoginDto,
  SuccessNaverLoginDto,
  ResponseGoogleLoginDto,
  ResponseNaverLoginDto,
} from '../types/socialLogin.types';
import { extractErrorMessage, isErrorResponse, isSuccessResponse } from '@/shared/utils/apiErrorHandler';

// 구글 소셜 로그인
export const postGoogleLogin = async (body: RequestGoogleLoginDto): Promise<SuccessGoogleLoginDto> => {
  let responseData: ResponseGoogleLoginDto;

  try {
    ({ data: responseData } = await axiosInstance.post<ResponseGoogleLoginDto>('/auth/oauth/google', body, {
      skipTokenRefresh: true,
    } as CustomAxiosRequestConfig));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '구글 로그인 중 오류가 발생했습니다. 다시 시도해주세요.'));
  }

  if (isErrorResponse<string>(responseData)) {
    throw new Error(responseData.errorMessage || '구글 로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
  }

  if (isSuccessResponse<SuccessGoogleLoginDto>(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// 네이버 소셜 로그인
export const postNaverLogin = async (body: RequestNaverLoginDto): Promise<SuccessNaverLoginDto> => {
  let responseData: ResponseNaverLoginDto;

  try {
    ({ data: responseData } = await axiosInstance.post<ResponseNaverLoginDto>('/auth/oauth/naver', body, {
      skipTokenRefresh: true,
    } as CustomAxiosRequestConfig));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '네이버 로그인 중 오류가 발생했습니다. 다시 시도해주세요.'));
  }

  if (isErrorResponse<string>(responseData)) {
    throw new Error(responseData.errorMessage || '네이버 로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
  }

  if (isSuccessResponse<SuccessNaverLoginDto>(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};
