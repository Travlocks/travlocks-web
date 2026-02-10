import { axiosInstance } from '@/shared/apis/axios';
import type { ResponseGetMeDto } from '../types/user';

export const getMypage = async (): Promise<ResponseGetMeDto> => {
  const { data } = await axiosInstance.get('/members/me/mypage');

  return data;
};
