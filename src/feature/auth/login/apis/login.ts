import { axiosInstance, type CustomAxiosRequestConfig } from '@/shared/apis/axios';
import type { RequestLoginDto, ResponseLoginDto, ResponseRefreshTokenDto } from '../login.type';

// 로그인
export const postLogin = async (body: RequestLoginDto): Promise<ResponseLoginDto> => {
  try {
    const { data } = await axiosInstance.post<ResponseLoginDto>('/auth/login', body, {
      skipTokenRefresh: true, // 로그인 실패 시 토큰 갱신 시도하지 않음
    } as CustomAxiosRequestConfig);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 토큰 갱신
export const postRefreshToken = async (): Promise<ResponseRefreshTokenDto> => {
  try {
    const { data } = await axiosInstance.post<ResponseRefreshTokenDto>(
      '/auth/refresh',
      {},
      { skipTokenRefresh: true } as CustomAxiosRequestConfig, // refresh 무한 루프 방지
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
