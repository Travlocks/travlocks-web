import { useMutation } from '@tanstack/react-query';
import { postPasswordResetLink } from '../apis/passwordReset';
import type { RequestPasswordResetLinkDto, PasswordResetLinkSuccessResponse } from '../types/passwordReset.types';

interface UsePasswordResetLinkOptions {
  onSuccess?: (data: PasswordResetLinkSuccessResponse) => void;
  onError?: (error: Error, errorMessage: string) => void;
}

export const usePasswordResetLink = (options?: UsePasswordResetLinkOptions) => {
  const mutation = useMutation<PasswordResetLinkSuccessResponse, Error, RequestPasswordResetLinkDto>({
    mutationFn: postPasswordResetLink,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      const errorMessage = error.message;
      console.error('비밀번호 재설정 링크 전송 실패:', errorMessage);

      options?.onError?.(error, errorMessage);
    },
  });

  return {
    resetPasswordLink: mutation.mutate,
    isPending: mutation.isPending,
  };
};
