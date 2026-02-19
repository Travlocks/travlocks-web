import { axiosInstance } from '@/shared/apis/axios';
import type { TemplateDayRoutesResponseDTO, TemplateDetailResponseDTO } from '../types/templateDetail.types';

/**
 * 템플릿 상세 정보 조회 API 호출
 * @param templateId 템플릿 ID
 */
export async function getTemplateDetail(templateId: number): Promise<TemplateDetailResponseDTO> {
  const { data } = await axiosInstance.get<TemplateDetailResponseDTO>(`/templates/${templateId}`);
  return data;
}

/**
 * 템플릿 특정 day 경로 정보 조회 API 호출
 * @param templateId 템플릿 ID
 * @param dayNo day 번호 (1-based)
 */
export async function getTemplateDayRoutes(templateId: number, dayNo: number): Promise<TemplateDayRoutesResponseDTO> {
  const { data } = await axiosInstance.get<TemplateDayRoutesResponseDTO>(
    `/templates/${templateId}/days/${dayNo}/routes`,
  );
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
