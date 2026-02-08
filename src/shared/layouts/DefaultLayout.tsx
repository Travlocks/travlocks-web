import Navbar from '@/shared/components/Navbar/Navbar';
import MainBg from '@components/MainBg';
import SplashFlow from '@/feature/splash/SplashFlow';
import { Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useRouteGuard } from '@feature/splash/hooks/useRouteGuard';
import { useSplashStore } from '@/shared/stores/splashStore';

interface DefaultLayoutProps {
  showNavbar?: boolean;
  protectedRoutes?: boolean;
}

const DefaultLayout = ({ showNavbar = true, protectedRoutes = false }: DefaultLayoutProps) => {
  const { completeSplash, setIsAnimating } = useSplashStore((state) => state.actions);

  const { showSplash, isAuthPage, isHomeRoute, redirectTo } = useRouteGuard(protectedRoutes);

  // 스플래시 완료 전 홈 페이지 접근 시 블로킹
  const shouldBlockForSplash = isHomeRoute && showSplash;

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  // 스플래시 애니메이션 시작 핸들러
  const handleSplashStart = () => {
    setIsAnimating(true);
  };

  // 스플래시 애니메이션 완료 핸들러
  const handleSplashDone = () => {
    completeSplash();
  };

  return (
    <div className="relative w-full min-h-dvh overflow-hidden" aria-label="메인 레이아웃">
      {/* 메인 배경 */}
      {showSplash || isAuthPage ? <MainBg /> : <div className="absolute inset-0 z-base bg-base-color-6" />}
      {/* 스플래시 플로우 */}
      {isHomeRoute && (
        <AnimatePresence mode="wait">
          {showSplash && <SplashFlow key="splash" onStart={handleSplashStart} onDone={handleSplashDone} />}
        </AnimatePresence>
      )}
      {/* 스플래시 완료 후 메인 콘텐츠 렌더링 */}
      {!shouldBlockForSplash && (
        <div className="relative z-content">
          {showNavbar && <Navbar />}

          <main>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
