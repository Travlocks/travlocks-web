import { useMutation } from '@tanstack/react-query';
import { postOnboarding } from '../apis/onboarding';
import { useAuth } from '@/shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import type { RequestOnboardingDto, SuccessOnboardingDto, ErrorOnboardingDto } from '../types/onboarding.types';

interface UseOnboardingMutationOptions {
  onSuccess?: (data: SuccessOnboardingDto) => void;
  onError?: (error: AxiosError<ErrorOnboardingDto>, errorMessage: string) => void;
}

// 온보딩
export const useOnboardingMutation = (options?: UseOnboardingMutationOptions) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation<SuccessOnboardingDto, AxiosError<ErrorOnboardingDto>, RequestOnboardingDto>({
    mutationFn: postOnboarding,
    onSuccess: (data) => {
      if (data.isSuccess && data.data) {
        const { accessToken } = data.data;

        login(accessToken);
        navigate('/', { replace: true });
      }

      options?.onSuccess?.(data);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.errorMessage || '온보딩 중 오류가 발생했습니다.';
      console.error('온보딩 실패:', errorMessage);

      options?.onError?.(error, errorMessage);
    },
  });
};
