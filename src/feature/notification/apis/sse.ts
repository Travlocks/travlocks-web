let eventSource: EventSource | null = null;

export const connectSSE = () => {
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
};
