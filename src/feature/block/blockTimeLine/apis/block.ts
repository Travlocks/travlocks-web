import { axiosInstance } from '@/shared/apis/axios';
import type { RequestAIVlocksDto, ResponseAIVlocksDto } from '../types/block';

// AI 장소 추천
export const getRecommenedAIVlocks = async ({ templateId }: RequestAIVlocksDto): Promise<ResponseAIVlocksDto> => {
  const { data } = await axiosInstance.get(`/templates/${templateId}/vlocks/suggestions`);

  return data;
};
