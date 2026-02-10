import type { SuccessPayload } from '@/shared/types/common';

// 유저 정보 조회 (마이페이지 조회)
export type Count = {
  vlockCount: number;
  templateCount: number;
  starCount: number;
};

export type CreatedVlock = {
  vlockId: number;
  vlockName: string;
  regionId: number;
  createdAt: string;
};

export type CreatedTemplate = {
  templateId: number;
  templateTitle: string;
  regionId: number;
  createdAt: string;
  isFavorite: boolean;
};

export type MyDataDto = {
  memberId: number;
  nickname: string;
  introduction: string;
  profileImageUrl: string;
  email: string;
  preferredTravelStyleIds: number[];
  preferredTravelThemeIds: number[];
  counts: Count;
  recent: {
    createdVlocks: CreatedVlock[];
    createdTemplates: CreatedTemplate[];
  };
};

export type ResponseGetMeDto = SuccessPayload<MyDataDto>;
