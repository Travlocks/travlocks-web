import { QUERY_KEY } from '@/shared/constants/key';
import { useQuery } from '@tanstack/react-query';
import { getMypage } from '../../apis/user';

function useGetMyPage() {
  return useQuery({
    queryKey: [QUERY_KEY.member],
    queryFn: getMypage,
  });
}

export default useGetMyPage;
