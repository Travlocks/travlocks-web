import type { AxiosError } from 'axios';

// 에러 응답 타입
export interface ErrorResponse {
  status: number;
  message: string;
}

export type ApiError = AxiosError<ErrorResponse>;
