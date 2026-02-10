import { axiosInstance } from '@/shared/apis/axios';
import type { ResponseGetNotificationDto, ResponseNotificationsDto } from '../types/notification';

// SSE용 토큰 생성 및 쿠키 저장
export const postSSEToken = async (): Promise<ResponseNotificationsDto> => {
  const { data } = await axiosInstance.post('/notifications/sse-token');

  return data;
};

// 알림 리스트 조회
export const getNotificationList = async (
  cursor: string | undefined,
  size: number,
): Promise<ResponseGetNotificationDto> => {
  const { data } = await axiosInstance.get(`/notifications`, {
    params: {
      cursor,
      size,
    },
  });

  return data;
};

// 알림 전체 삭제
export const deleteNotifications = async (): Promise<ResponseNotificationsDto> => {
  const { data } = await axiosInstance.delete('/notifications');

  return data;
};
