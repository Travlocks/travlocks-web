import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/key';
import { getCreatedBlocks, getPopularBlocks, getBlocksByCategory } from '../../apis/blockList.api';
import type { CategoryBlockListSuccessResponse } from '../../types/blockCategory.types';

interface UseCityParam {
  cityId: number;
}

// 인기 블록 조회
export const usePopularBlocks = ({ cityId }: UseCityParam) => {
  return useQuery<CategoryBlockListSuccessResponse, Error>({
    queryKey: [QUERY_KEY.popularVlocks, cityId],
    queryFn: () => getPopularBlocks(cityId),
    enabled: !!cityId,
    staleTime: 5 * 60 * 1000,
  });
};

// 내가 만든 블록 조회
export const useCreatedBlocks = ({ cityId }: UseCityParam) => {
  return useQuery<CategoryBlockListSuccessResponse, Error>({
    queryKey: [QUERY_KEY.createdVlocks, cityId],
    queryFn: () => getCreatedBlocks(cityId),
    enabled: !!cityId,
    staleTime: 5 * 60 * 1000,
  });
};

interface UseBlocksByCategoryParams {
  cityId: number;
  categoryId: number;
}

// 카테고리별 블록 조회
export const useBlocksByCategory = (params: UseBlocksByCategoryParams) => {
  return useQuery<CategoryBlockListSuccessResponse, Error>({
    queryKey: [QUERY_KEY.vlockCategories, params.cityId, params.categoryId],
    queryFn: () => getBlocksByCategory(params.cityId, params.categoryId),
    enabled: !!params.cityId && !!params.categoryId,
    staleTime: 5 * 60 * 1000,
  });
};
