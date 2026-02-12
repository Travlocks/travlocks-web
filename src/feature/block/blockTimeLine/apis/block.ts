import { axiosInstance } from '@/shared/apis/axios';
import type { RequestAIVlocksDto, ResponseAIVlocksDto } from '../types/block';

// AI 장소 추천
export const getRecommenedAIVlocks = async ({
  templateId,
  dayNo = 1,
}: RequestAIVlocksDto): Promise<ResponseAIVlocksDto> => {
  const { data } = await axiosInstance.get(`/templates/${templateId}/days/${dayNo}/vlocks/suggestions`);

  return data;
};
