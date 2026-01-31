import { create } from 'zustand';
import { LOCAL_STORAGE_KEY } from '../constants/key';

type AuthUser = {
  memberId: number;
};

export type AuthActions = {
  setUser: (user: AuthUser | null) => void;
  login: (memberId: number, accessToken: string, accessTokenExpiresAt: number) => void;
  logout: () => void;
  initAuth: () => void;
};

export type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessTokenExpiresAt: number | null;
  actions: AuthActions;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  accessTokenExpiresAt: null,
  actions: {
    // 사용자 정보 설정
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    // 로그인
    login: (memberId, accessToken, accessTokenExpiresAt) => {
      localStorage.setItem(LOCAL_STORAGE_KEY.memberId, JSON.stringify(memberId));
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, JSON.stringify(accessToken));
      localStorage.setItem(LOCAL_STORAGE_KEY.accessTokenExpiresAt, JSON.stringify(accessTokenExpiresAt));

      set({
        user: { memberId },
        isAuthenticated: true,
        isLoading: false,
      });
    },
    // 로그아웃
    logout: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.memberId);
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessTokenExpiresAt);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    },
    // 로그인 상태 초기화
    initAuth: () => {
      const memberId = localStorage.getItem(LOCAL_STORAGE_KEY.memberId);
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
      const accessTokenExpiresAt = localStorage.getItem(LOCAL_STORAGE_KEY.accessTokenExpiresAt);

      if (memberId && accessToken && accessTokenExpiresAt) {
        set({
          user: { memberId: JSON.parse(memberId) },
          isAuthenticated: true,
          isLoading: false,
          accessTokenExpiresAt: JSON.parse(accessTokenExpiresAt),
        });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    },
  },
}));
