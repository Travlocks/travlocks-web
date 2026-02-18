import { axiosInstance } from '@/shared/apis/axios';
import type { ResponseAITemplateDto, ResponsePopularTemplateDto, ResponseRemixDto } from '../types/template';

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

// 템플릿 리믹스
export const postTemplateRemix = async (templateId: number): Promise<ResponseRemixDto> => {
  const { data } = await axiosInstance.post(`/templates/${templateId}/remix`);

  return data;
};
