import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNotifications } from '../../apis/notification';
import { QUERY_KEY } from '@/shared/constants/key';

function useDeleteNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.notification],
      });
    },
  });
}

export default useDeleteNotifications;
