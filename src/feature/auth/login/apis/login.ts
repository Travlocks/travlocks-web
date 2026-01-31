import { axiosInstance } from '@/shared/apis/axios';
import type { RequestLoginDto, ResponseLoginDto, ResponseRefreshTokenDto } from '../login.type';

// 로그인
export const postLogin = async (body: RequestLoginDto): Promise<ResponseLoginDto> => {
  try {
    const { data } = await axiosInstance.post<ResponseLoginDto>('/auth/login', body);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 토큰 갱신
export const postRefreshToken = async (): Promise<ResponseRefreshTokenDto> => {
  try {
    const { data } = await axiosInstance.post<ResponseRefreshTokenDto>('/auth/refresh');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
