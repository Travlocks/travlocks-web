import { axiosInstance } from '@/shared/apis/axios';
import type {
  RequestUpdateMyProfileDto,
  ResponseMemberProfileDto,
  ResponseMyPageDto,
  ResponseMyTemplatesDto,
  ResponseUpdateMyProfileDto,
} from '../types/mypage.type';

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

export const getMyTemplates = async (page = 0): Promise<ResponseMyTemplatesDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseMyTemplatesDto>('/members/me/templates', {
      params: { page },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMemberProfile = async (memberId: number, page = 0): Promise<ResponseMemberProfileDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseMemberProfileDto>(`/members/${memberId}/profile`, {
      params: { page },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
