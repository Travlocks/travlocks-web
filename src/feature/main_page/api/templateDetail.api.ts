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
/**
 * 템플릿 즐겨찾기 추가 API 호출
 */
export async function addFavorite(templateId: number): Promise<void> {
  await axiosInstance.put(`/templates/${templateId}/favorite`);
}

/**
 * 템플릿 즐겨찾기 삭제 API 호출
 */
export async function deleteFavorite(templateId: number): Promise<void> {
  await axiosInstance.delete(`/templates/${templateId}/favorite`);
}
