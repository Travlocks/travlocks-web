import { create } from 'zustand';
import { SESSION_STORAGE_KEY } from '@/shared/constants/key';

export type SplashState = {
  showSplash: boolean;
  hasSeenSplash: boolean;
  isAnimating: boolean;
  actions: SplashActions;
};

export type SplashActions = {
  completeSplash: () => void;
  resetSplash: () => void;
  setIsAnimating: (value: boolean) => void;
};

// sessionStorage에서 초기값 읽기
const getInitialState = () => {
  const stored = sessionStorage.getItem(SESSION_STORAGE_KEY.showSplash);
  const hasSeenSplash = stored === 'false';

  return {
    showSplash: !hasSeenSplash,
    hasSeenSplash,
    isAnimating: false,
  };
};

export const useSplashStore = create<SplashState>((set) => ({
  ...getInitialState(),

  actions: {
    // 스플래시 완료 처리
    completeSplash: () => {
      sessionStorage.setItem(SESSION_STORAGE_KEY.showSplash, 'false');
      set({
        showSplash: false,
        hasSeenSplash: true,
        isAnimating: false,
      });
    },

    // 스플래시 초기화
    resetSplash: () => {
      sessionStorage.removeItem(SESSION_STORAGE_KEY.showSplash);
      set({
        showSplash: true,
        hasSeenSplash: false,
        isAnimating: false,
      });
    },

    // 애니메이션 상태 제어
    setIsAnimating: (value: boolean) => {
      set({ isAnimating: value });
    },
  },
}));
