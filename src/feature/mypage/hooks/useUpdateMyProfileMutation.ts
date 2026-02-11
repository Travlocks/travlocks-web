import type { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchMyProfile } from '../apis/mypage';
import type { RequestUpdateMyProfileDto, ResponseUpdateMyProfileDto } from '../types/mypage.type';

interface UseUpdateMyProfileMutationOptions {
  onSuccess?: (data: ResponseUpdateMyProfileDto) => void;
  onError?: (error: AxiosError) => void;
}

export const useUpdateMyProfileMutation = (options?: UseUpdateMyProfileMutationOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseUpdateMyProfileDto, AxiosError, RequestUpdateMyProfileDto>({
    mutationFn: patchMyProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
      options?.onError?.(error);
    },
  });

  return {
    updateMyProfile: mutation.mutate,
    isPending: mutation.isPending,
  };
};
