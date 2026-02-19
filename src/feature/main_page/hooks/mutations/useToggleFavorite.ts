import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite, deleteFavorite } from '../../api/templateDetail.api';

/**
 * 템플릿 즐겨찾기 토글을 위한 커스텀 Mutation 훅
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ templateId, isFavorited }: { templateId: number; isFavorited: boolean }) =>
      isFavorited ? addFavorite(templateId) : deleteFavorite(templateId),
    onSuccess: (_, { templateId }) => {
      // 해당 템플릿의 상세 정보 쿼리를 무효화하여 최신 상태(isFavorited)를 가져오도록 함
      queryClient.invalidateQueries({ queryKey: ['templateDetail', templateId] });
    },
    onError: (error) => {
      console.error('즐겨찾기 토글 실패:', error);
    },
  });
}
