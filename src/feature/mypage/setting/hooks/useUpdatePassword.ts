import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPassword } from '../apis/password.api';
import type { PasswordSuccessResponse, RequestPasswordDto } from '../types/password.types';
import { QUERY_KEY } from '@/shared/constants/key';

interface UseUpdatePasswordOptions {
  onSuccess: (data: PasswordSuccessResponse) => void;
  onError: (error: Error, errorMessage: string) => void;
}

export const useUpdatePassword = (options?: UseUpdatePasswordOptions) => {
  const queryClient = useQueryClient();
  const { mutate: updatePassword, isPending } = useMutation<PasswordSuccessResponse, Error, RequestPasswordDto>({
    mutationFn: postPassword,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.member] });
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      const errorMessage = error.message;
      options?.onError?.(error, errorMessage);
    },
  });

  return {
    updatePassword,
    isPending,
  };
};
