import type { SuccessPayload } from '@/shared/types/common';

// 최근 작업 노출
export type Template = {
  id: number;
  title: string;
  updatedAt: string;
  progressRate: number;
  regionName: string;
};

export type ResponseRecentDto = SuccessPayload<Template[]>;
