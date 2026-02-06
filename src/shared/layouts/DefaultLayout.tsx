import Navbar from '@/shared/components/Navbar/Navbar';
import MainBg from '@components/MainBg';
import SplashFlow from '@/feature/splash/SplashFlow';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useRouteGuard } from '@feature/splash/hooks/useRouteGuard';
import { useSplashState } from '@/feature/splash/hooks/useSplashState';

interface DefaultLayoutProps {
  showNavbar?: boolean;
  protectedRoutes?: boolean;
}

const DefaultLayout = ({ showNavbar = true, protectedRoutes = false }: DefaultLayoutProps) => {
  const { handleSplashDone } = useSplashState();

  const { showSplash, isAuthPage, isHomeRoute, redirectTo } = useRouteGuard(protectedRoutes);

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="relative w-full min-h-dvh overflow-hidden" aria-label="메인 레이아웃">
      {/* 메인 배경 */}
      {showSplash || isAuthPage ? <MainBg /> : <div className="absolute inset-0 z-base bg-base-color-6" />}
      {/* 스플래시 플로우 */}
      {isHomeRoute && (
        <AnimatePresence mode="wait">
          {showSplash && <SplashFlow key="splash" onDone={handleSplashDone} />}
        </AnimatePresence>
      )}
      {/* 스플래시 완료 후 메인 콘텐츠 렌더링 */}
      {!showSplash && (
        <div className="relative z-content">
          {showNavbar && <Navbar />}

          <main>
            <Suspense fallback={'로딩 중...'}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
