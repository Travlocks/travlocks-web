import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPassword } from '../apis/password.api';
import type { ResponsePasswordDto } from '../types/password.types';
import type { AxiosError } from 'axios';

interface UseUpdatePasswordProps {
  onSuccess: (data: ResponsePasswordDto) => void;
  onError: (error: AxiosError) => void;
}

// TODO: 머지되면 수정 (임시훅)
export const useUpdatePassword = ({ onSuccess, onError }: UseUpdatePasswordProps) => {
  const queryClient = useQueryClient();
  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: postPassword,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
      onSuccess(data);
    },
    onError: (error: AxiosError<unknown>) => {
      onError(error);
    },
  });
  return { updatePassword, isPending };
};
