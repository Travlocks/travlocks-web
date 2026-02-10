import { axiosInstance } from '@/shared/apis/axios';

// 로그아웃
export const postLogout = async () => {
  const { data } = await axiosInstance.post('/auth/logout');

  return data;
};
