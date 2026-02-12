import { axiosInstance } from '@/shared/apis/axios';
import type { OnboardingRequestDto, OnboardingResponseDto } from '../types/onboarding.type';
import { isErrorResponse, isSuccessResponse } from '@/shared/utils/apiErrorHandler';
import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';

export const postTemplatesPreInputs = async (body: OnboardingRequestDto): Promise<OnboardingResponseDto> => {
  const { data } = await axiosInstance.post<SuccessPayload<OnboardingResponseDto> | ErrorPayload<unknown>>(
    '/templates/pre-inputs',
    body,
  );

  if (isErrorResponse(data)) {
    throw new Error(data.errorMessage || '여행 설정 중 오류가 발생했습니다.');
  }

  if (isSuccessResponse(data)) {
    return data.data;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};
