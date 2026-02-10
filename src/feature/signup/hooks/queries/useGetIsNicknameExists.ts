import { useQuery } from '@tanstack/react-query';
import { getIsNicknameExists } from '../../apis/auth';
import type { RequestNicknameDto } from '../../types/auth';

function useGetIsNicknameExists({ nickname }: RequestNicknameDto) {
  return useQuery({
    queryKey: ['nickname-exists', nickname],
    queryFn: () => getIsNicknameExists({ nickname }),
    enabled: nickname.length > 0,
  });
}

export default useGetIsNicknameExists;
