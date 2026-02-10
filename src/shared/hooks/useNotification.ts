import { useShallow } from 'zustand/react/shallow';
import { useNotificationStore } from '../stores/notificationStore';

export const useNotification = () => {
  const { unread, setUnread } = useNotificationStore(
    useShallow((state) => ({
      unread: state.unread,
      setUnread: state.setUnread,
    })),
  );

  return { unread, setUnread };
};
