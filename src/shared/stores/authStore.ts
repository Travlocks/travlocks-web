import { create } from 'zustand';
import { LOCAL_STORAGE_KEY } from '../constants/key';

export type AuthActions = {
  login: (accessToken: string) => void;
  logout: () => void;
  initAuth: () => void;
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: AuthActions;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  actions: {
    // 로그인
    login: (accessToken) => {
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, JSON.stringify(accessToken));
      set({ isAuthenticated: true, isLoading: false });
    },
    // 로그아웃
    logout: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      set({ isAuthenticated: false, isLoading: false });
    },
    // 로그인 상태 초기화
    initAuth: () => {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

      if (accessToken) {
        set({ isAuthenticated: true, isLoading: false });
      } else {
        set({ isAuthenticated: false, isLoading: false });
      }
    },
  },
}));
