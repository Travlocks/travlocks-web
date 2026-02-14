import type { SuccessPayload } from '@/shared/types/common';
import type { PageResponse } from '@/shared/types/pagination';

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

export interface TemplateCard {
  templateId: number;
  coverImgUrl: string;
  title: string;
  travelThemeId: number;
  travelTheme: string;
  memberId: number;
  ownerNickname: string;
  rating: number;
  favoriteCount: number;
}

export interface MemberProfile {
  memberId: number;
  nickname: string;
  introduction: string;
  profileImageUrl: string;
  templates: PageResponse<TemplateCard>;
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
export type ResponseMyTemplatesDto = SuccessPayload<PageResponse<TemplateCard>>;
export type ResponseMemberProfileDto = SuccessPayload<MemberProfile>;
export type ResponseUpdateMyProfileDto = SuccessPayload<UpdatedMyProfile>;
