import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { preloadLottie } from './shared/utils/lottiePreloader.ts';

// 시작시에 로티 파일 로드
preloadLottie();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
