import type { SuccessPayload } from '@/shared/types/common';

export type TemplateDetailVlock = {
  vlockId: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
};

export type TemplateDetailData = {
  templateId: number;
  title: string;
  cityName: string;
  theme: string;
  ownerProfileImage: string | null;
  ownerNickname: string;
  coverImageUrl: string | null;
  ownerId: number;
  rating: number;
  tripDays: string;
  remixCount: number;
  description: string | null;
  tags: string[];
  vlocks: TemplateDetailVlock[];
  isFavorited: boolean;
};

export type ResponseTemplateDetailDto = SuccessPayload<TemplateDetailData>;
