import { useQuery } from '@tanstack/react-query';
import { getRecentTemplates } from '../../apis/draft';
import { QUERY_KEY } from '@/shared/constants/key';

function useGetRecentTemplates() {
  return useQuery({
    queryKey: [QUERY_KEY.template],
    queryFn: getRecentTemplates,
    retry: false,
    initialData: {
      isSuccess: true,
      successCode: '',
      successMessage: '',
      data: [],
    },
  });
}

export default useGetRecentTemplates;
