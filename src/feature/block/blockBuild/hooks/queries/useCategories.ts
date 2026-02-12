import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/key';
import { getCategories } from '../../apis/blockMeta.api';
import type { BlockCategoryListSuccessResponse } from '../../types/blockCategory.types';

// 블록 카테고리 조회
export const useCategories = () => {
  return useQuery<BlockCategoryListSuccessResponse, Error>({
    queryKey: [QUERY_KEY.vlockCategories],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });
};
