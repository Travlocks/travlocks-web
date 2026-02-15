import { useLocation, useMatches } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import { useSplashStore } from '@/shared/stores/splashStore';
import { useShallow } from 'zustand/react/shallow';

interface RouteHandle {
  skipSplash?: boolean;
  skipSessionGate?: boolean;
}

export const useRouteGuard = (protectedRoutes: boolean) => {
  const location = useLocation();
  const { isAuthenticated, shouldRequireAuth } = useAuth();
  const matches = useMatches();

  // store에서 상태 읽기
  const { showSplash, hasSeenSplash, isAnimating } = useSplashStore(
    useShallow((state) => ({
      showSplash: state.showSplash,
      hasSeenSplash: state.hasSeenSplash,
      isAnimating: state.isAnimating,
    })),
  );

  // 현재 라우트의 플래그 조회 (handle)
  const routeFlags = matches.reduce<RouteHandle>(
    (acc, m) => ({
      skipSplash: acc.skipSplash || (m.handle as RouteHandle)?.skipSplash || false,
      skipSessionGate: acc.skipSessionGate || (m.handle as RouteHandle)?.skipSessionGate || false,
    }),
    { skipSplash: false, skipSessionGate: false },
  );

  // 현재 경로 분석
  const AUTH_PAGES = ['/login', '/signup', '/password', '/password-reset', '/onboarding'];
  const isAuthPage = AUTH_PAGES.includes(location.pathname);
  const isHomeRoute = location.pathname === '/';
  const returnTo = location.pathname + location.search;

  // 스플래시 오버레이 표시 여부
  const shouldShowSplashOverlay = showSplash && !isAuthPage && !routeFlags.skipSplash;

  const getRedirect = () => {
    // 스플래시 중에는 어떤 페이지로든 리다이렉트 X
    if (isAnimating || shouldShowSplashOverlay) {
      return null;
    }

    // 스플래시 본 상태 + 보호 라우트 + 인증필요
    if (protectedRoutes && shouldRequireAuth && !routeFlags.skipSessionGate && !isAuthPage) {
      return '/login';
    }
    return null;
  };

  return {
    isAuthPage,
    showSplash,
    isHomeRoute,
    returnTo,
    shouldShowSplashOverlay,
    isAuthenticated,
    hasSeenSplash,
    isAnimating,
    redirectTo: getRedirect(),
  };
};
