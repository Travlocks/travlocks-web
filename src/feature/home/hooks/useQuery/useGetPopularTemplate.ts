import { QUERY_KEY } from '@/shared/constants/key';
import { useQuery } from '@tanstack/react-query';
import { getPopularTemplate } from '../../apis/template';

function useGetPopularTemplate() {
  return useQuery({
    queryKey: [QUERY_KEY.popularTemplate],
    queryFn: getPopularTemplate,
  });
}

export default useGetPopularTemplate;
