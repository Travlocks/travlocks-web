import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/key';
import { getAISmartSort } from '../../apis/templateBlock.api';
import type { ResponseOptimizeDto } from '../../blockBuild.type';

interface UseAISmartSortParams {
  templateId: number;
  dayNo: number;
}

// AI 스마트 정렬
export const useAISmartSort = ({ templateId, dayNo }: UseAISmartSortParams) => {
  return useQuery<ResponseOptimizeDto, Error>({
    queryKey: [QUERY_KEY.optimizeRoute, templateId, dayNo],
    queryFn: () => getAISmartSort(templateId, dayNo),
    enabled: !!templateId && !!dayNo,
  });
};
