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
      data: [
        {
          id: 34,
          title: '자연 여행 1',
          updatedAt: '2026-02-03T21:38:44',
          progressRate: 0,
          regionName: '서울',
        },
      ],
    },
  });
}

export default useGetRecentTemplates;
