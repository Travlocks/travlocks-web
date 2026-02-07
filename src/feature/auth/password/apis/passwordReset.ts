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
import type { EmailExistsResponse, EmailExistsSuccessResponse } from '../types/emailExists';

// 비밀번호 재설정 링크 요청
export const postPasswordResetLink = async (
  data: RequestPasswordResetLinkDto,
): Promise<PasswordResetLinkSuccessResponse> => {
  let responseData: PasswordResetLinkSuccessResponse | PasswordResetErrorResponse;
  try {
    ({ data: responseData } = await axiosInstance.post<PasswordResetLinkSuccessResponse | PasswordResetErrorResponse>(
      '/auth/password-reset/request',
      data,
    ));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '일시적인 오류가 발생했습니다. 다시 시도해주세요'));
  }

  if (isErrorResponse<string>(responseData)) {
    throw new Error(responseData.errorMessage || '일시적인 오류가 발생했습니다. 다시 시도해주세요');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// 비밀번호 재설정 요청
export const postPasswordReset = async (data: RequestPasswordResetDto): Promise<PasswordResetSuccessResponse> => {
  let responseData: PasswordResetSuccessResponse | PasswordResetErrorResponse;
  try {
    ({ data: responseData } = await axiosInstance.post<PasswordResetSuccessResponse | PasswordResetErrorResponse>(
      '/auth/password-reset/confirm',
      data,
    ));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '비밀번호 재설정 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<string>(responseData)) {
    throw new Error(responseData.errorMessage || '비밀번호 재설정에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// 비밀번호 재설정 토큰 유효성 검증
export const getPasswordResetToken = async (token: string): Promise<VerifyTokenSuccessResponse> => {
  let responseData: VerifyTokenResponse;
  try {
    ({ data: responseData } = await axiosInstance.get<VerifyTokenResponse>('/auth/password-reset/verify', {
      params: {
        token,
      },
    }));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '토큰 검증 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<string>(responseData)) {
    throw new Error(responseData.errorMessage || '토큰이 올바르지 않거나 만료되었습니다.');
  }

  if (isSuccessResponse(responseData) && responseData.data.valid) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// 이메일 존재 여부 조회
export const getEmailExists = async (email: string): Promise<EmailExistsSuccessResponse> => {
  let responseData: EmailExistsResponse;
  try {
    ({ data: responseData } = await axiosInstance.get<EmailExistsResponse>('/members/email/exists', {
      params: {
        email,
      },
    }));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '일시적인 오류가 발생했습니다. 다시 시도해주세요'));
  }

  if (isErrorResponse<string>(responseData)) {
    throw new Error(responseData.errorMessage || '일시적인 오류가 발생했습니다. 다시 시도해주세요');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};
