import { axiosInstance } from '@/shared/apis/axios';
import type {
  RequestEmailVerifiacationDto,
  RequestEmailVerificationConfirmDto,
  RequestEmailVerificationResnedDto,
  ResponseEmailVerificationConfirmDto,
  ResponseEmailVerificationDto,
  ResponseEmailVerificationResendDto,
} from '../types/auth';

// 이메일 인증 코드 발송
export const postEmailVerificationDto = async (
  email: RequestEmailVerifiacationDto,
): Promise<ResponseEmailVerificationDto> => {
  const { data } = await axiosInstance.post('auth/email-verification', email);

  return data;
};

// 이메일 인증 코드 확인
export const postEmailVerificationConfirm = async (
  body: RequestEmailVerificationConfirmDto,
): Promise<ResponseEmailVerificationConfirmDto> => {
  const { data } = await axiosInstance.post('/auth/email-verification/confirm', body);

  return data;
};

// 이메일 인증 코드 재발송
export const postEmailVerificationResend = async (
  verificationId: RequestEmailVerificationResnedDto,
): Promise<ResponseEmailVerificationResendDto> => {
  const { data } = await axiosInstance.post('/auth/email-verification/resend', verificationId);

  return data;
};
