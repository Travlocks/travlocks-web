import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putFavorite, deleteFavorite } from '../apis/favorite';
import type { AxiosError } from 'axios';

interface UseFavoriteMutationOptions {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}

export const useFavoriteMutation = (options?: UseFavoriteMutationOptions) => {
  const queryClient = useQueryClient();

  const addFavorite = useMutation<void, AxiosError, number>({
    mutationFn: putFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      console.error('Failed to add favorite:', error);
      options?.onError?.(error);
    },
  });

  const removeFavorite = useMutation<void, AxiosError, number>({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      console.error('Failed to remove favorite:', error);
      options?.onError?.(error);
    },
  });

  const toggleFavorite = (templateId: number, isFavorite: boolean) => {
    if (isFavorite) {
      removeFavorite.mutate(templateId);
    } else {
      addFavorite.mutate(templateId);
    }
  };

  return {
    toggleFavorite,
    isPending: addFavorite.isPending || removeFavorite.isPending,
  };
};
