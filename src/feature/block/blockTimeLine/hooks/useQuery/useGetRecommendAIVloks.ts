import { QUERY_KEY } from '@/shared/constants/key';
import { useQuery } from '@tanstack/react-query';
import { getRecommenedAIVlocks } from '../../apis/block';

function useGetRecommendAIVloks(templateId: number, dayNo: number) {
  return useQuery({
    queryKey: [QUERY_KEY.vlock, templateId],
    queryFn: () => getRecommenedAIVlocks({ templateId, dayNo }),
  });
}

export default useGetRecommendAIVloks;
