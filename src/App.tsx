import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/pageRoutes';
import { useEffect } from 'react';
import { useAuthStore } from './shared/stores/authStore';
import ToastContainer from './shared/components/Toast/Toast';
import { connectSSE } from './feature/notification/apis/sse';
import { postSSEToken } from './feature/notification/apis/notification';
import { useNotificationStore } from './shared/stores/notificationStore';

export const queryClient = new QueryClient();

function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setUnread = useNotificationStore((s) => s.setUnread);

  // 앱 시작 시 즉시 인증 상태 초기화
  useEffect(() => {
    useAuthStore.getState().actions.initAuth();
  }, []);

  // 로그인 성공 후 SSE 연결
  useEffect(() => {
    if (!isAuthenticated) return;

    const initSSE = async () => {
      await postSSEToken();
      connectSSE(setUnread);
    };

    initSSE();
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
