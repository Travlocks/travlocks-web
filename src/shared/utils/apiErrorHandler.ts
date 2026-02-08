import type { ApiError, ErrorPayload } from '@/shared/types/error';
import type { AxiosResponse } from 'axios';

// API 에러에서 메시지 추출
export const extractErrorMessage = <T = unknown>(error: unknown, defaultMessage: string): string => {
  // ApiError
  if (error && typeof error === 'object' && 'response' in error) {
    const apiError = error as ApiError;
    const { data: errorData } = apiError.response as AxiosResponse<ErrorPayload<T>>;

    // 에러 응답
    if (errorData && 'errorCode' in errorData) {
      return errorData.errorMessage || defaultMessage;
    }
  }

  // 일반 에러
  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};

// 성공 응답인지 확인
export const isSuccessResponse = <T>(response: T | ErrorPayload<unknown>): response is T & { successCode: string } => {
  return typeof response === 'object' && response !== null && 'successCode' in response;
};

// 에러 응답인지 확인
export const isErrorResponse = <T = unknown>(response: unknown): response is ErrorPayload<T> => {
  return typeof response === 'object' && response !== null && 'errorCode' in response;
};
