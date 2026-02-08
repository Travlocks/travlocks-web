import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPassword } from '../apis/password.api';
import type { PasswordSuccessResponse } from '../types/password.types';
import type { AxiosError } from 'axios';
import { QUERY_KEY } from '@/shared/constants/key';

interface UseUpdatePasswordOptions {
  onSuccess: (data: PasswordSuccessResponse) => void;
  onError: (error: AxiosError, errorMessage: string) => void;
}

export const useUpdatePassword = (options?: UseUpdatePasswordOptions) => {
  const queryClient = useQueryClient();
  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: postPassword,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.member] });
      options?.onSuccess?.(data);
    },
    onError: (error: AxiosError<unknown>) => {
      const errorMessage = error.message;
      options?.onError?.(error, errorMessage);
    },
  });

  return {
    updatePassword,
    isPending,
  };
};
