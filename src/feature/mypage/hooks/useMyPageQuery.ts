import { useQuery } from '@tanstack/react-query';
import { getMyPage } from '../apis/mypage';
import type { MyPage } from '../types/mypage.type';

export const useMyPageQuery = () => {
  return useQuery<MyPage>({
    queryKey: ['mypage'],
    queryFn: async () => {
      const response = await getMyPage();
      return response.data;
    },
  });
};
