import type { TravelTheme } from '@/feature/template/template.types';
import type { SuccessPayload } from '@/shared/types/common';

// AI 템플릿 추천 리스트 조회
export type Template = {
  templateId: number;
  coverImgUrl: string;
  title: string;

  tripTheme?: TravelTheme;
  travelTheme?: TravelTheme;

  description?: string | null;
  region?: string;
  tripDays?: number | string;
  totalScore?: number;
  ownerNickname?: string;
  avgRating?: number;
  remixCount?: number;
};

export type ResponseAITemplateDto = SuccessPayload<{
  templates: Template[];
}>;

// 인기 템플릿 추천 리스트 조회
export type ResponsePopularTemplateDto = SuccessPayload<Template[]>;
