import { QUERY_KEY } from '@/shared/constants/key';
import { useQuery } from '@tanstack/react-query';
import { getMypage } from '../../apis/user';
import { useAuth } from '@/shared/hooks/useAuth';

function useGetMyPage() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEY.member],
    queryFn: getMypage,
    enabled: isAuthenticated,
  });
}

export default useGetMyPage;
