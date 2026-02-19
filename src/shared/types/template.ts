import type { SuccessPayload } from './common';

export type TemplateDetailData = {
  templateId: number;
  title: string;
  ownerNickname: string;
  tripDays: string;
};

export type ResponseTemplateDetailDto = SuccessPayload<TemplateDetailData>;

export type RequestTemplateRatingDto = {
  rating: number;
  content?: string;
};

export type ResponseTemplateRatingDto = SuccessPayload<unknown>;
