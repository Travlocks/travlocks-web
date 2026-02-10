import { create } from 'zustand';

interface NotificationState {
  unread: boolean;
  setUnread: (value: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unread: false,
  setUnread: (value) => set({ unread: value }),
}));
