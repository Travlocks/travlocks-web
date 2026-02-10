import { axiosInstance } from '@/shared/apis/axios';
import type { ResponseNotificationsDto } from '../types/notification';

// SSE용 토큰 생성 및 쿠키 저장
export const postSSEToken = async (): Promise<ResponseNotificationsDto> => {
  const { data } = await axiosInstance.post('/notifications/sse-token');

  return data;
};
