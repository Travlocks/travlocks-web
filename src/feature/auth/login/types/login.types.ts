import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';

// 로그인 요청 타입
export type RequestLoginDto = {
  email: string;
  password: string;
};

export type LoginStatus = 'ACTIVE' | 'ONBOARDING';

export type Login = {
  memberId: number;
  status?: LoginStatus;
  accessToken: string;
  accessTokenExpiresIn: number;
};

// 로그인 성공 응답 타입
export type ResponseLoginDto = SuccessPayload<Login>;

// 로그인 에러 응답 타입
export type ErrorLoginDto = ErrorPayload<Login>;

// 토큰 갱신 성공 응답 타입
export type ResponseRefreshTokenDto = SuccessPayload<Login>;

// 토큰 갱신 에러 응답 타입
export type ErrorRefreshTokenDto = ErrorPayload<Login>;
