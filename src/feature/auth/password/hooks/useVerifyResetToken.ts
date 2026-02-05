import { useMutation } from '@tanstack/react-query';
import { getPasswordResetToken } from '../apis/passwordReset';
import type { VerifyTokenSuccessResponse } from '../types/passwordReset.types';

interface UseVerifyResetTokenOptions {
  onSuccess?: (data: VerifyTokenSuccessResponse) => void;
  onError?: (error: Error) => void;
}

export const useVerifyResetToken = (options?: UseVerifyResetTokenOptions) => {
  const mutation = useMutation<VerifyTokenSuccessResponse, Error, string>({
    mutationFn: getPasswordResetToken,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      const errorMessage = error.message;
      console.error('비밀번호 재설정 토큰 검증 실패:', errorMessage);
      options?.onError?.(error);
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};
