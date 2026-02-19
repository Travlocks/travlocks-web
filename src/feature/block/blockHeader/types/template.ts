import type { SuccessPayload } from '@/shared/types/common';

// 통합 템플릿 저장
export type RequestSaveTemplateDto = {
  title: string;
  description: string;
  coverImage: File | null | string;
  isPublic: boolean;
};

export type ResponseSaveTemplateDto = SuccessPayload<{
  templateId: number;
  title: string;
  description: string;
  coverImageUrl: string;
  isPublic: boolean;
  shareToken: string;
  updatedAt: string;
}>;
