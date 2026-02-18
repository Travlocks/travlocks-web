import { axiosInstance } from '@/shared/apis/axios';
import type { RequestAIVlocksDto, ResponseAIVlocksDto, ResponseTemplateDetailDto } from '../types/block';

// AI 장소 추천
export const getRecommenedAIVlocks = async ({ templateId }: RequestAIVlocksDto): Promise<ResponseAIVlocksDto> => {
  const { data } = await axiosInstance.get(`/templates/${templateId}/vlocks/suggestions`);

  return data;
};

// 템플릿 상세 화면 조회
export const getTemplateDetail = async (templateId: number): Promise<ResponseTemplateDetailDto> => {
  const { data } = await axiosInstance.get(`/templates/${templateId}`);

  return data;
};
