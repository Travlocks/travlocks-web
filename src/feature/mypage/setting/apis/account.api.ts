import { axiosInstance } from '@/shared/apis/axios';
import type { RequestAccountWithdrawalDto, ResponseAccountWithdrawalDto } from '../types/account.types';
import { extractErrorMessage, isErrorResponse, isSuccessResponse } from '@/shared/utils/apiErrorHandler';

export const deleteAccount = async (data: RequestAccountWithdrawalDto): Promise<ResponseAccountWithdrawalDto> => {
  let responseData: ResponseAccountWithdrawalDto;
  try {
    ({ data: responseData } = await axiosInstance.delete<ResponseAccountWithdrawalDto>('/members/me', { data }));
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
