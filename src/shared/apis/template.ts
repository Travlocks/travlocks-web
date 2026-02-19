import { axiosInstance } from './axios';
import type {
  RequestTemplateRatingDto,
  ResponseTemplateDetailDto,
  ResponseTemplateRatingDto,
} from '@/shared/types/template';

export const getTemplateDetail = async (templateId: number): Promise<ResponseTemplateDetailDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseTemplateDetailDto>(`/templates/${templateId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postTemplateRating = async (
  templateId: number,
  body: RequestTemplateRatingDto,
): Promise<ResponseTemplateRatingDto> => {
  const { data } = await axiosInstance.post<ResponseTemplateRatingDto>(`/templates/${templateId}/ratings`, body);
  return data;
};
