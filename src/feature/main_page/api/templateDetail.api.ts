import { axiosInstance } from '@/shared/apis/axios';
import type { TemplateDetailResponseDTO } from '../types/templateDetail.types';

/**
 * 템플릿 상세 정보 조회 API 호출
 * @param templateId 템플릿 ID
 */
export async function getTemplateDetail(templateId: number): Promise<TemplateDetailResponseDTO> {
  const { data } = await axiosInstance.get<TemplateDetailResponseDTO>(`/templates/${templateId}`);
  return data;
}
