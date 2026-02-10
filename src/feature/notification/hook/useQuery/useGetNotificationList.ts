import { QUERY_KEY } from '@/shared/constants/key';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { getNotificationList } from '../../apis/notification';
import type { ResponseGetNotificationDto } from '../../types/notification';

function useGetNotificationList() {
  return useInfiniteQuery<
    ResponseGetNotificationDto,
    Error,
    InfiniteData<ResponseGetNotificationDto>,
    string[],
    string | undefined
  >({
    queryKey: [QUERY_KEY.notification],
    queryFn: ({ pageParam }) => getNotificationList(pageParam, 10),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) return undefined;
      return lastPage.data.nextCursor;
    },
  });
}

export default useGetNotificationList;
