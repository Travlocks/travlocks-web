import { axiosInstance } from '@/shared/apis/axios';
import type { RequestUpdateMyProfileDto, ResponseMyPageDto, ResponseUpdateMyProfileDto } from '../types/mypage.type';

export const getMyPage = async (): Promise<ResponseMyPageDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseMyPageDto>('/members/me/mypage');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchMyProfile = async (request: RequestUpdateMyProfileDto): Promise<ResponseUpdateMyProfileDto> => {
  try {
    const { data } = await axiosInstance.patch<ResponseUpdateMyProfileDto>('/members/me/profile', request);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
