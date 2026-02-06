import type { SuccessPayload } from '@/shared/types/common';

// 이메일 인증 코드 발송
export type RequestEmailVerifiacationDto = {
  email: string;
};

export type ResponseEmailVerificationDto = SuccessPayload<{
  verificationId: string;
}>;
