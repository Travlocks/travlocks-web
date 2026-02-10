let eventSource: EventSource | null = null;

export const connectSSE = (setUnread: (value: boolean) => void) => {
  if (eventSource) return; // 중복 연결을 방지

  // 알림 구독 (SSE 연결)
  eventSource = new EventSource(`${import.meta.env.VITE_SERVER_API_URL}/notifications/subscribe`, {
    withCredentials: true,
  });

  eventSource.onopen = () => {
    console.log('sse connected');
  };

  eventSource.onerror = (err) => {
    console.error('sse error', err);
  };

  // connected 이벤트
  eventSource.addEventListener('connected', (e) => {
    console.log('connected:', e);
  });

  // new-notification 이벤트
  eventSource.addEventListener('notification', (e) => {
    console.log('new-notification', e);
  });

  // ping 이벤트
  eventSource.addEventListener('ping', (e) => {
    console.log('ping', e);
  });

  // unread 이벤트
  eventSource.addEventListener('unread', (e) => {
    console.log('unread', e);

    if (e.data) {
      setUnread(true);
    }
  });
};
