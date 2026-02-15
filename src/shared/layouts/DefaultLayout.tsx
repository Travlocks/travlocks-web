import Navbar from '@/shared/components/Navbar/Navbar';
import MainBg from '@components/MainBg';
import SplashFlow from '@/feature/splash/SplashFlow';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ScrollToTop from '../components/scrollToTop';
import Footer from '../components/Footer/Footer';
import { useRouteGuard } from '@/feature/splash/hooks/useRouteGuard';
import { useSplashStore } from '../stores/splashStore';
import { useShallow } from 'zustand/react/shallow';

interface DefaultLayoutProps {
  showNavbar?: boolean;
  protectedRoutes?: boolean;
}

const DefaultLayout = ({ showNavbar = true, protectedRoutes = false }: DefaultLayoutProps) => {
  const { isAuthPage, returnTo, redirectTo, shouldShowSplashOverlay } = useRouteGuard(protectedRoutes);

  const { actions } = useSplashStore(
    useShallow((state) => ({
      actions: state.actions,
    })),
  );

  if (redirectTo) {
    return <Navigate to={redirectTo} state={{ from: returnTo }} replace />;
  }

  return (
    <div className="relative w-full min-h-dvh overflow-hidden" aria-label="메인 레이아웃">
      <ScrollToTop />

      {/* 메인 배경 */}
      {shouldShowSplashOverlay || isAuthPage ? <MainBg /> : <div className="absolute inset-0 z-base bg-base-color-6" />}
      {/* 스플래시 플로우 */}
      {shouldShowSplashOverlay && (
        <SplashFlow onStart={() => actions.setIsAnimating(true)} onDone={() => actions.completeSplash()} />
      )}

      {/* 스플래시 완료 후 메인 콘텐츠 렌더링 */}
      {!shouldShowSplashOverlay && (
        <div className="relative z-content">
          {showNavbar && <Navbar />}

          <main>
            <Suspense fallback={''}>
              <Outlet />
            </Suspense>
          </main>
          {!isAuthPage && <Footer />}
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
