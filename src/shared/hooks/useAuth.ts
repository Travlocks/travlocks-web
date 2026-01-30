import { useCallback, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useShallow } from 'zustand/react/shallow';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '../constants/key';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, actions } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      actions: state.actions,
    })),
  );

  const navigate = useNavigate();

  // 로그인 상태 초기화
  useEffect(() => {
    actions.initAuth();
  }, [actions]);

  // 로그아웃
  const logout = useCallback(
    (redirect: string = '/login') => {
      actions.logout();
      navigate(redirect);
    },
    [actions, navigate],
  );

  // 액세스 토큰 가져오기
  const getAccessToken = useCallback(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    return token ? JSON.parse(token) : null;
  }, []);

  // 인증 필요 페이지 접근 제한
  const requireAuth = useCallback(
    (redirectTo: string = '/login') => {
      if (!isLoading && !isAuthenticated) {
        navigate(redirectTo);
        return false;
      }
      return isAuthenticated;
    },
    [isLoading, isAuthenticated, navigate],
  );

  // 인증된 사용자가 접근 제한 페이지 접근 제한
  const requireGuest = useCallback(
    (redirectTo: string = '/') => {
      if (!isLoading && isAuthenticated) {
        navigate(redirectTo);
        return false;
      }
      return !isAuthenticated;
    },
    [isLoading, isAuthenticated, navigate],
  );

  return {
    // 상태
    user,
    isAuthenticated,
    isLoading,
    memberId: user?.memberId ?? null,
    // 액션
    logout,
    getAccessToken,
    requireAuth,
    requireGuest,
    initAuth: actions.initAuth,
    login: actions.login,
    setUser: actions.setUser,
  };
};
