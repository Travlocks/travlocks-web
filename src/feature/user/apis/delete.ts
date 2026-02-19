import { axiosInstance } from '@/shared/apis/axios';
import type { ResponseDeleteTemplateDto } from '../types/delete';

// 템플릿 삭제
export const deleteTemplate = async (templateId: number): Promise<ResponseDeleteTemplateDto> => {
  const { data } = await axiosInstance.delete(`/templates/${templateId}`);

  return data;
};
