import type { SuccessPayload } from '@/shared/types/common';

// SSE용 토큰 생성 및 쿠키 저장
export type ResponseNotificationsDto = SuccessPayload<null>;

// 알림 리스트 조회
export type Notification = {
  notificationId: number;
  actorId: number;
  actorNickname: string;
  templateId: number;
  type: string;
  createdAt: string;
  timeAgo: string;
};

export type ResponseGetNotificationDto = SuccessPayload<{
  notificationCount: number;
  hasNext: boolean;
  nextCursor: string | undefined;
  notifications: Notification[];
}>;
