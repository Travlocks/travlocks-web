import { axiosInstance } from '@/shared/apis/axios';
import type {
  PasswordResetErrorResponse,
  PasswordResetLinkSuccessResponse,
  PasswordResetSuccessResponse,
  RequestPasswordResetDto,
  RequestPasswordResetLinkDto,
  VerifyTokenResponse,
  VerifyTokenSuccessResponse,
} from '../types/passwordReset.types';
import { extractErrorMessage, isErrorResponse, isSuccessResponse } from '@/shared/utils/apiErrorHandler';

// 비밀번호 재설정 링크 요청
export const postPasswordResetLink = async (
  data: RequestPasswordResetLinkDto,
): Promise<PasswordResetLinkSuccessResponse> => {
  try {
    const { data: responseData } = await axiosInstance.post<
      PasswordResetLinkSuccessResponse | PasswordResetErrorResponse
    >('/auth/password-reset/request', data);

    // 에러 응답인 경우
    if (isErrorResponse<string>(responseData)) {
      throw new Error(responseData.errorMessage || '');
    }

    // 성공 응답인 경우
    if (isSuccessResponse(responseData)) {
      return responseData;
    }

    // 알 수 없는 응답 형식인 경우
    throw new Error('알 수 없는 응답 형식입니다.');
  } catch (error) {
    throw new Error(extractErrorMessage(error, '일시적인 오류가 발생했습니다. 다시 시도해주세요'));
  }
};

// 비밀번호 재설정 요청
export const postPasswordReset = async (data: RequestPasswordResetDto): Promise<PasswordResetSuccessResponse> => {
  try {
    const { data: responseData } = await axiosInstance.post<PasswordResetSuccessResponse | PasswordResetErrorResponse>(
      '/auth/password-reset/confirm',
      data,
    );

    // 에러 응답인 경우
    if (isErrorResponse<string>(responseData)) {
      throw new Error(responseData.errorMessage || '비밀번호 재설정에 실패했습니다.');
    }

    // 성공 응답인 경우
    if (isSuccessResponse(responseData)) {
      return responseData;
    }

    // 알 수 없는 응답 형식인 경우
    throw new Error('알 수 없는 응답 형식입니다.');
  } catch (error) {
    throw new Error(extractErrorMessage(error, '비밀번호 재설정 중 오류가 발생했습니다.'));
  }
};

// 비밀번호 재설정 토큰 유효성 검증
export const getPasswordResetToken = async (token: string): Promise<VerifyTokenSuccessResponse> => {
  try {
    const { data: responseData } = await axiosInstance.get<VerifyTokenResponse>('/auth/password-reset/verify', {
      params: {
        token,
      },
    });

    if (isErrorResponse<string>(responseData)) {
      throw new Error(responseData.errorMessage || '토큰이 올바르지 않거나 만료되었습니다.');
    }

    if (isSuccessResponse(responseData) && responseData.data.valid) {
      return responseData;
    }

    throw new Error('알 수 없는 응답 형식입니다.');
  } catch (error) {
    throw new Error(extractErrorMessage(error, '토큰 검증 중 오류가 발생했습니다.'));
  }
};
