import { axiosInstance } from './axios';
import type { ResponseTemplateDetailDto } from '@/shared/types/template';

export const getTemplateDetail = async (templateId: number): Promise<ResponseTemplateDetailDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseTemplateDetailDto>(`/templates/${templateId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
