import { QUERY_KEY } from '@/shared/constants/key';
import { useQuery } from '@tanstack/react-query';
import { getAITemplate } from '../../apis/template';

function useGetAITemplate() {
  return useQuery({
    queryKey: [QUERY_KEY.AITemplate],
    queryFn: getAITemplate,
  });
}

export default useGetAITemplate;
