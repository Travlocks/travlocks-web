import { axiosInstance } from '@/shared/apis/axios';
import type { RequestPasswordResetDto, RequestPasswordResetLinkDto } from '../types/passwordReset.types';

// 비밀번호 재설정 링크 요청
export const postPasswordResetLink = async (data: RequestPasswordResetLinkDto) => {
  try {
    const response = await axiosInstance.post('/auth/password-reset/request', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 비밀번호 재설정 요청
export const postPasswordReset = async (data: RequestPasswordResetDto) => {
  try {
    const response = await axiosInstance.post('/auth/password-reset/confirm', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 비밀번호 재설정 토큰 유효성 검증
export const getPasswordResetToken = async (token: string) => {
  try {
    const response = await axiosInstance.get(`/auth/password-reset/verify?token=${token}`, {
      params: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
