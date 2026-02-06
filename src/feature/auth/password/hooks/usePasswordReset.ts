import { useMutation } from '@tanstack/react-query';
import { postPasswordReset } from '../apis/passwordReset';
import type { PasswordResetSuccessResponse, RequestPasswordResetDto } from '../types/passwordReset.types';

interface UsePasswordResetOptions {
  onSuccess?: (data: PasswordResetSuccessResponse) => void;
  onError?: (error: Error, errorMessage: string) => void;
}

export const usePasswordReset = (options?: UsePasswordResetOptions) => {
  const mutation = useMutation<PasswordResetSuccessResponse, Error, RequestPasswordResetDto>({
    mutationFn: postPasswordReset,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: Error) => {
      const errorMessage = error.message;
      console.error('비밀번호 재설정 실패:', errorMessage);

      options?.onError?.(error, errorMessage);
    },
  });

  return {
    resetPassword: mutation.mutate,
    isPending: mutation.isPending,
  };
};
