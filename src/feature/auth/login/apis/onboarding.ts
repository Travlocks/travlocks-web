import { axiosInstance } from '@/shared/apis/axios';
import type { RequestOnboardingDto, SuccessOnboardingDto, ResponseOnboardingDto } from '../types/onboarding.types';
import { extractErrorMessage, isErrorResponse, isSuccessResponse } from '@/shared/utils/apiErrorHandler';

// OAuth 온보딩
export const postOnboarding = async (body: RequestOnboardingDto): Promise<SuccessOnboardingDto> => {
  let responseData: ResponseOnboardingDto;

  try {
    ({ data: responseData } = await axiosInstance.post<ResponseOnboardingDto>('/members/onboarding', body));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '온보딩 완료 중 오류가 발생했습니다. 다시 시도해주세요.'));
  }

  if (isErrorResponse<string>(responseData)) {
    throw new Error(responseData.errorMessage || '온보딩 완료 중 오류가 발생했습니다. 다시 시도해주세요.');
  }

  if (isSuccessResponse<SuccessOnboardingDto>(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};
