import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { useAuthStore } from './shared/stores/authStore';

// 앱 시작 시 즉시 인증 상태 초기화
useAuthStore.getState().actions.initAuth();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
