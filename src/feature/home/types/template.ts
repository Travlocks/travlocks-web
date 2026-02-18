import type { SuccessPayload } from '@/shared/types/common';

// AI 템플릿 추천 리스트 조회
export type Template = {
  templateId: number;
  coverImgUrl: string | null;
  title: string;
  description: string | null;
  region: string;
  tripDays: number | string;
  tripTheme: string;
  totalScore?: number;
};

export type ResponseAITemplateDto = SuccessPayload<{
  templates: Template[];
}>;
