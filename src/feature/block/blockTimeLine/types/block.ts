import type { SuccessPayload } from '@/shared/types/common';

// AI 장소 추천
export type RequestAIVlocksDto = {
  templateId: number;
};

export type Vlock = {
  vlockId: number;
  coverImgUrl: string;
  name: string;
  categoryName: string;
  stayhours: string;
};

export type ResponseAIVlocksDto = SuccessPayload<{
  vlocks: Vlock[];
}>;

// 템플릿 상세 화면 조회
export type ResponseTemplateDetailDto = SuccessPayload<{
  cityName: string;
  tripDays: string;
  description: string;
  title: string;
}>;
