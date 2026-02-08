import { axiosInstance } from '@/shared/apis/axios';
import type { RequestPasswordDto, ResponsePasswordDto } from '../types/password.types';

// TODO: 머지되면 수정 예정 (임시파일)
export const postPassword = async (data: RequestPasswordDto): Promise<ResponsePasswordDto> => {
  try {
    const response = await axiosInstance.patch('members/me/password', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
