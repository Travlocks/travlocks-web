import { axiosInstance } from '@/shared/apis/axios';
import type { RequestEmailVerifiacationDto, ResponseEmailVerificationDto } from '../types/auth';

// 이메일 인증 코드 발송
export const postEmailVerificationDto = async (
  email: RequestEmailVerifiacationDto,
): Promise<ResponseEmailVerificationDto> => {
  const { data } = await axiosInstance.post('auth/email-verification', email);

  return data;
};
