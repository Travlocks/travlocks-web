import type { AxiosError } from 'axios';

// 에러 페이로드
export interface ErrorPayload<T> {
  isSuccess: boolean;
  errorCode: string;
  errorMessage: string;
  data: T;
}

export type ApiError = AxiosError<ErrorPayload<unknown>>;
