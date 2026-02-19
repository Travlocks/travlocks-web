import type { SuccessPayload } from '@/shared/types/common';

export interface VlockDetailDTO {
  vlockId: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

export type TemplateRouteTransportType = 'WALK' | 'CAR' | 'TRANSIT';

export interface TemplateDayRouteDTO {
  moveTimeId: number | null;
  fromVlockId: number;
  toVlockId: number;
  moveMinutes: number;
  distanceMeter: number;
  transportType: TemplateRouteTransportType;
  polyline: number[][];
}

export interface TemplateDayRoutesDTO {
  routes: TemplateDayRouteDTO[];
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
export type TemplateDayRoutesResponseDTO = SuccessPayload<TemplateDayRoutesDTO>;
