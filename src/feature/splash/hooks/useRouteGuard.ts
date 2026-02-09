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
  const AUTH_PAGES = ['/login', '/signup', '/password', '/password-reset'];
  const isAuthPage = AUTH_PAGES.includes(location.pathname);
  const isHomeRoute = location.pathname === '/';

  const getRedirect = () => {
    if (isAnimating) {
      return null;
    }

    // 스플래시 안본상태 + 인증 페이지 접근시
    if (!hasSeenSplash && isAuthPage && !routeFlags.skipSplash) {
      return '/';
    }
    // 스플래시 안본상태 + 다른 페이지 접근시
    if (!hasSeenSplash && !isAuthPage && !isHomeRoute && !routeFlags.skipSplash) {
      return '/';
    }

    // 스플래시 본 상태 + 보호 라우트 + 인증필요
    if (hasSeenSplash && protectedRoutes && shouldRequireAuth && !routeFlags.skipSessionGate) {
      return '/login';
    }
    return null;
  };

  return {
    isAuthPage,
    showSplash,
    isHomeRoute,
    isAuthenticated,
    hasSeenSplash,
    isAnimating,
    redirectTo: getRedirect(),
  };
};
