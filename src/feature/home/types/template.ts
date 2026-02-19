import type { TravelTheme } from '@/feature/template/template.types';
import type { SuccessPayload } from '@/shared/types/common';

// AI 템플릿 추천 리스트 조회
export type Template = {
  templateId: number;
  title: string;
  coverImageUrl: string | null;

  travelTheme?: TravelTheme;
  tripTheme?: TravelTheme; // 추천 템플릿에서 사용

  description?: string | null;
  region?: string;
  tripDays?: number | string;
  totalScore?: number;
  ownerId?: number;
  ownerNickname?: string;
  avgRating?: number;
  remixCount?: number;
};

export type ResponseAITemplateDto = SuccessPayload<{
  templates: Template[];
}>;

// 인기 템플릿 추천 리스트 조회
export type ResponsePopularTemplateDto = SuccessPayload<Template[]>;

// 템플릿 리믹스
export type ResponseRemixDto = SuccessPayload<{
  remixedTemplateId: number;
  parentTemplateId: number;
}>;
