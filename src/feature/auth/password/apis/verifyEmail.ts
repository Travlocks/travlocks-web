import { axiosInstance } from '@/shared/apis/axios';
import type { EmailExistsResponse, EmailExistsSuccessResponse } from '../types/emailExists';
import { extractErrorMessage, isErrorResponse, isSuccessResponse } from '@/shared/utils/apiErrorHandler';

// 이메일 존재 여부 조회
export const getEmailExists = async (email: string): Promise<EmailExistsSuccessResponse> => {
  let responseData: EmailExistsResponse;
  try {
    ({ data: responseData } = await axiosInstance.get<EmailExistsResponse>('/members/email/exists', {
      params: {
        email,
      },
    }));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '일시적인 오류가 발생했습니다. 다시 시도해주세요'));
  }

  if (isErrorResponse<string>(responseData)) {
    throw new Error(responseData.errorMessage || '일시적인 오류가 발생했습니다. 다시 시도해주세요');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};
