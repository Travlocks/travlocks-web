import type { SuccessPayload } from './common';

export type TemplateDetailData = {
  templateId: number;
  title: string;
  tripDays: string;
};

export type ResponseTemplateDetailDto = SuccessPayload<TemplateDetailData>;
