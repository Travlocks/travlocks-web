import { axiosInstance } from '@/shared/apis/axios';
import type { ResponseTemplateDetailDto } from '../types/sidebar';

export const getTemplateDetail = async (templateId: number): Promise<ResponseTemplateDetailDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseTemplateDetailDto>(`/templates/${templateId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
