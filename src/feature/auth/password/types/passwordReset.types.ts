import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';

// 비밀번호 재설정 링크 전송 요청 타입
export type RequestPasswordResetLinkDto = {
  email: string;
};

// 비밀번호 재설정 요청 타입
export type RequestPasswordResetDto = {
  token: string;
  newPassword: string;
  newPasswordConfirm: string;
};

// 비밀번호 재설정 링크 전송 성공 응답
export type PasswordResetLinkSuccessResponse = SuccessPayload<null>;

// 비밀번호 재설정 성공 응답
export type PasswordResetSuccessResponse = SuccessPayload<null>;

// 토큰 검증 성공 응답
export type VerifyTokenSuccessResponse = SuccessPayload<{
  valid: boolean;
}>;

// 에러 응답 (400) - ErrorPayload 사용
export type PasswordResetErrorResponse = ErrorPayload<string>;

export type VerifyTokenResponse = VerifyTokenSuccessResponse | PasswordResetErrorResponse;
