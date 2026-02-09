import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/key';
import { getRegions } from '../../apis/blockMeta.api';
import type { RegionListSuccessResponse } from '../../types/blockRegion.types';

// 지역 목록 조회
export const useRegions = () => {
  return useQuery<RegionListSuccessResponse, Error>({
    queryKey: [QUERY_KEY.regions],
    queryFn: getRegions,
    staleTime: 5 * 60 * 1000,
  });
};
