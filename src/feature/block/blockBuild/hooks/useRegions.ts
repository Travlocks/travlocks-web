import { useQuery } from '@tanstack/react-query';
import { getRegions } from '../apis/blockMeta';
import type { RegionListSuccessResponse } from '../types/blockMeta.types';

// 지역 목록 조회
export const useRegions = () => {
  return useQuery<RegionListSuccessResponse, Error>({
    queryKey: ['regions'],
    queryFn: getRegions,
    staleTime: 5 * 60 * 1000,
  });
};
