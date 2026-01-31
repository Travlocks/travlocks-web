import { useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useShallow } from 'zustand/react/shallow';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { isAuthenticated, isLoading, actions } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      actions: state.actions,
    })),
  );

  const navigate = useNavigate();

  // 로그아웃
  const logout = useCallback(
    (redirect: string = '/login') => {
      actions.logout();
      navigate(redirect);
    },
    [actions, navigate],
  );

  // 메모리에서 액세스 토큰 가져오기
  const getAccessToken = useCallback(() => {
    return actions.getAccessToken();
  }, [actions]);

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

  // 인증이 필요한 페이지에서 리다이렉트가 필요한지 체크 (Navigate 컴포넌트용)
  const shouldRequireAuth = !isLoading && !isAuthenticated;

  // 게스트 전용 페이지에서 리다이렉트가 필요한지 체크 (Navigate 컴포넌트용)
  const shouldRequireMember = !isLoading && isAuthenticated;

  return {
    // 상태
    isAuthenticated,
    isLoading,
    shouldRequireAuth,
    shouldRequireMember,
    // 액션
    logout,
    getAccessToken,
    requireAuth,
    requireGuest,
    initAuth: actions.initAuth,
    login: actions.login,
  };
};
