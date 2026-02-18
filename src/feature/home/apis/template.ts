import { axiosInstance } from '@/shared/apis/axios';
import type { ResponseAITemplateDto, ResponsePopularTemplateDto } from '../types/template';

// AI 템플릿 추천 리스트 조회
export const getAITemplate = async (): Promise<ResponseAITemplateDto> => {
  const { data } = await axiosInstance.get('/templates/recommendations');

  return data;
};

// 인기 템플릿 추천 리스트 조회
export const getPopularTemplate = async (): Promise<ResponsePopularTemplateDto> => {
  const { data } = await axiosInstance.get('/templates/popular');

  return data;
};
