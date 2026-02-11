import type { SuccessPayload } from '@/shared/types/common';

export interface VlockDto {
  vlockId: number;
  vlockName: string;
  regionId: number;
  createdAt: string;
}

export interface CreatedTemplateDto {
  templateId: number;
  templateTitle: string;
  regionId: number;
  createdAt: string;
  favorite: boolean;
}

export interface CountsDto {
  vlockCount: number;
  templateCount: number;
  starCount: number;
}

export interface RecentDto {
  myPageRecentVlocks: VlockDto[];
  myPageRecentTemplates: CreatedTemplateDto[];
}

export interface MyPage {
  memberId: number;
  nickname: string;
  introduction: string;
  profileImageUrl: string;
  email: string;
  preferredTravelStyleIds: number[];
  preferredTravelThemeIds: number[];
  counts: CountsDto;
  recent: RecentDto;
}

export interface RequestUpdateMyProfileDto {
  nickname: string;
  introduction: string;
  preferredTravelStyleIds: number[];
  preferredTravelThemeIds: number[];
}

export interface UpdatedMyProfile {
  memberId: number;
  nickname: string;
  introduction: string;
  preferredTravelStyleIds: number[];
  preferredTravelThemeIds: number[];
}

export type ResponseMyPageDto = SuccessPayload<MyPage>;
export type ResponseUpdateMyProfileDto = SuccessPayload<UpdatedMyProfile>;
