import type { SuccessPayload } from '@/shared/types/common';

export type TemplateDetailVlock = {
  vlockId: number;
  name: string;
  latitude: number | null;
  longitude: number | null;
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
  rating: number | null;
  tripDays: string;
  remixCount: number;
  description: string;
  tags: string[];
  vlocks: TemplateDetailVlock[];
  isFavorited: boolean;
};

export type ResponseTemplateDetailDto = SuccessPayload<TemplateDetailData>;
