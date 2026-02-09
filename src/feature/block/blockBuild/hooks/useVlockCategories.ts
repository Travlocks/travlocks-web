import { useQuery } from '@tanstack/react-query';
import { getVlockCategories } from '../apis/blockMeta';
import type { VlockCategoryListSuccessResponse } from '../types/blockMeta.types';

// 블록 카테고리 조회
export const useVlockCategories = () => {
  return useQuery<VlockCategoryListSuccessResponse, Error>({
    queryKey: ['vlockCategories'],
    queryFn: getVlockCategories,
    staleTime: 5 * 60 * 1000,
  });
};
