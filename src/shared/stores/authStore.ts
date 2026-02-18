import { create } from 'zustand';
import { postRefreshToken } from '@/feature/auth/login/apis/login';

export type AuthActions = {
  login: (accessToken: string) => void;
  logout: () => void;
  initAuth: () => Promise<void>;
  getAccessToken: () => string | null;
  setAccessToken: (token: string | null) => void;
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  actions: AuthActions;
};

// 메모리 기반 토큰 저장소
// let memoryToken: string | null = null;
let memoryToken: string | null =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzcxNDQ2NDQ1LCJleHAiOjE3NzE0NTAwNDV9.J6DM5yqoHhxZicfsNWsjtfzty1QSQZc2ULT-ho6IICY';

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  actions: {
    // 로그인
    login: (accessToken) => {
      memoryToken = accessToken;
      set({ isAuthenticated: true, isLoading: false, accessToken });
    },
    // 로그아웃
    logout: () => {
      memoryToken = null;
      set({ isAuthenticated: false, isLoading: false, accessToken: null });
    },
    // 액세스 토큰 가져오기
    getAccessToken: () => {
      return memoryToken;
    },
    // 액세스 토큰 설정
    setAccessToken: (token) => {
      memoryToken = token;
      set({ accessToken: token, isAuthenticated: !!token });
    },
    // 로그인 상태 초기화 (refresh token으로 새 access token 발급)
    initAuth: async () => {
      try {
        // refresh token이 httpOnly 쿠키에 있으므로 자동으로 전송됨
        const { data } = await postRefreshToken();
        const newAccessToken = data.accessToken;
        memoryToken = newAccessToken;
        set({ isAuthenticated: true, isLoading: false, accessToken: newAccessToken });
      } catch {
        // refresh token이 없거나 만료된 경우
        memoryToken = null;
        set({ isAuthenticated: false, isLoading: false, accessToken: null });
      }
    },
  },
}));
