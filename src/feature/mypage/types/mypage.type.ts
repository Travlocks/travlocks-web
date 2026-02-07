import type { SuccessPayload } from '@/shared/types/common';
import type { Vlock } from '@/shared/types/vlock';

export type { Vlock as VlockDto };

export interface CreatedTemplateDto {
  templateId: number;
  title: string;
  city: string;
  createdAt: string;
  isFavorite: boolean;
}

export interface CountsDto {
  vlockCount: number;
  templateCount: number;
  starCount: number;
}

export interface RecentDto {
  createdVlocks: Vlock[];
  createdTemplates: CreatedTemplateDto[];
}

export interface MyPage {
  memberId: number;
  nickname: string;
  introduction: string;
  preferredTravelStyleIds: number[];
  preferredTravelThemeIds: number[];
  counts: CountsDto;
  recent: RecentDto;
}

export type ResponseMyPageDto = SuccessPayload<MyPage>;
