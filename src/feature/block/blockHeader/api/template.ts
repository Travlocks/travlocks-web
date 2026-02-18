import { axiosInstance } from '@/shared/apis/axios';
import type { RequestSaveTemplateDto, ResponseSaveTemplateDto } from '../types/template';

// 통합 템플릿 저장
export const patchSaveTemplate = async (
  templateId: number,
  body: RequestSaveTemplateDto,
): Promise<ResponseSaveTemplateDto> => {
  const formData = new FormData();

  const payload = {
    title: body.title,
    description: body.description,
    isPublic: body.isPublic,
  };
  formData.append('request', JSON.stringify(payload));

  if (body.coverImage) {
    formData.append('coverImage', body.coverImage);
  }

  const { data } = await axiosInstance.patch(`/templates/${templateId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
