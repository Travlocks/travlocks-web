import type { SuccessPayload } from '@/shared/types/common';

export interface VlockDetailDTO {
  vlockId: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface TemplateDetailDTO {
  templateId: number;
  title: string;
  cityName: string;
  theme: string;
  ownerProfileImage: string;
  ownerNickname: string;
  coverImageUrl: string | null;
  ownerId: number;
  rating: number;
  tripDays: string;
  remixCount: number;
  description: string | null;
  tags: string[];
  vlocks: VlockDetailDTO[];
  isFavorited: boolean;
}

export type TemplateDetailResponseDTO = SuccessPayload<TemplateDetailDTO>;
