import type { CommonResponse } from '@/shared/types/common';

// 로그인 요청 타입
export type RequestLoginDto = {
  email: string;
  password: string;
};

// 로그인 응답 타입
export type ResponseLoginDto = CommonResponse<{
  memberId: number;
  accessToken: string;
  accessTokenExpiresAt: number;
}>;

// 토큰 갱신 응답 타입
export type ResponseRefreshTokenDto = CommonResponse<{
  accessToken: string;
  accessTokenExpiresAt: number;
}>;
