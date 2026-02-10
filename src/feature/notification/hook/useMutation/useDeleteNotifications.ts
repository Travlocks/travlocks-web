import { useMutation } from '@tanstack/react-query';
import { deleteNotifications } from '../../apis/notification';

function useDeleteNotifications() {
  return useMutation({
    mutationFn: deleteNotifications,
  });
}

export default useDeleteNotifications;
