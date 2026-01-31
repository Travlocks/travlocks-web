import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/pageRoutes';
import { useEffect } from 'react';
import { useAuthStore } from './shared/stores/authStore';

export const queryClient = new QueryClient();

function App() {
  // 앱 시작 시 즉시 인증 상태 초기화
  useEffect(() => {
    useAuthStore.getState().actions.initAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
