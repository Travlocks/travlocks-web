import { useLocation } from 'react-router-dom';
import { useSplashState } from './useSplashState';
import { useMatches } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';

interface RouteHandle {
  skipSplash?: boolean;
  skipSessionGate?: boolean;
}

export const useRouteGuard = (protectedRoutes: boolean) => {
  const location = useLocation();
  const { showSplash, handleSplashDone, handleSplashReset, hasSeenSplash, setShowSplash } = useSplashState();
  const { isAuthenticated, shouldRequireAuth } = useAuth();
  const matches = useMatches();

  // 현재 라우트의 플래그 조회 (handle)
  const routeFlags = matches.reduce<RouteHandle>(
    (acc, m) => ({
      skipSplash: acc.skipSplash || (m.handle as RouteHandle)?.skipSplash || false,
      skipSessionGate: acc.skipSessionGate || (m.handle as RouteHandle)?.skipSessionGate || false,
    }),
    { skipSplash: false, skipSessionGate: false },
  );

  // 현재 경로 분석
  const AUTH_PAGES = ['/login', '/signup', '/password'];
  const isAuthPage = AUTH_PAGES.includes(location.pathname);
  const isHomeRoute = location.pathname === '/';

  const getRedirect = () => {
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
  };

  return {
    isAuthPage,
    showSplash,
    isHomeRoute,
    isAuthenticated,
    handleSplashDone,
    handleSplashReset,
    hasSeenSplash,
    setShowSplash,
    redirectTo: getRedirect(),
  };
};
