import { axiosInstance } from '@/shared/apis/axios';
import type { ResponseMyPageDto } from '../types/mypage.type';

export const getMyPage = async (): Promise<ResponseMyPageDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseMyPageDto>('/members/me/mypage');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
