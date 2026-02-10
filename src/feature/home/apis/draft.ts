import { axiosInstance } from '@/shared/apis/axios';
import type { ResponseRecentDto } from '../types/draft';
import axios from 'axios';
import type { ErrorPayload } from '@/shared/types/error';

// 최근 작업 노출
export const getRecentTemplates = async (): Promise<ResponseRecentDto> => {
  try {
    const { data } = await axiosInstance.get('/templates/recent');

    return data;
  } catch (error) {
    // 데이터 없는 경우 404로 들어옴
    if (
      axios.isAxiosError<ErrorPayload<null>>(error) &&
      error.response?.data.errorCode === 'TEMPLATE_RECENT_NOT_FOUND'
    ) {
      return {
        isSuccess: true,
        successCode: '',
        successMessage: '',
        data: [],
      };
    }

    throw error;
  }
};
