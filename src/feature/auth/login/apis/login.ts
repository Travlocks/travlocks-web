import { axiosInstance } from '@/shared/apis/axios';
import type { RequestLoginDto, ResponseLoginDto } from '../login.type';

// 로그인
export const postLogin = async (data: RequestLoginDto): Promise<ResponseLoginDto> => {
  try {
    const { data: response } = await axiosInstance.post<ResponseLoginDto>('/auth/login', data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 토큰 갱신
export const postRefreshToken = async (): Promise<ResponseLoginDto> => {
  try {
    const { data: response } = await axiosInstance.post<ResponseLoginDto>('/auth/refresh');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
