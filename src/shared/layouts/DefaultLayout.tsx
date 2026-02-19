import Navbar from '@/shared/components/Navbar/Navbar';
import MainBg from '@components/MainBg';
import SplashFlow from '@/feature/splash/SplashFlow';
import { Suspense, useEffect } from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ScrollToTop from '../components/scrollToTop';
import Footer from '../components/Footer/Footer';
import { useRouteGuard } from '@/feature/splash/hooks/useRouteGuard';
import { useSplashStore } from '../stores/splashStore';
import { useShallow } from 'zustand/react/shallow';
import Logo from '@assets/logo/logo-auth.svg?react';

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

  const [isBlocked, setIsBlocked] = useState(() => {
    const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.innerWidth < 1024;
    return isTouchPrimary || isSmallScreen;
  });

  useEffect(() => {
    const checkMobile = () => {
      // 1. 주 입력 장치가 '터치'인 기기 감지 (모바일, 태블릿)
      const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;

      // 2. 화면 너비 체크 (반응형 감지)
      const isSmallScreen = window.innerWidth < 1024;
      setIsBlocked(isTouchPrimary || isSmallScreen);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (redirectTo) {
    return <Navigate to={redirectTo} state={{ from: returnTo }} replace />;
  }

  return (
    <div className="relative w-full min-h-dvh overflow-hidden" aria-label="메인 레이아웃">
      <ScrollToTop />

      {/* 모바일/태블릿 접속 제한 오버레이 */}
      {isBlocked && (
        <div className="fixed inset-0 z-[10000] bg-base-color-6 flex flex-col items-center justify-center px-6 text-center">
          <div className="flex flex-col gap-6 items-center">
            <Logo className="w-60 h-40" />
            <div className="flex flex-col gap-2">
              <p className="h5 text-base-color-0 font-semibold">웹에서 봐주세요!</p>
              <p className="b6 text-base-color-2">
                트래블록스는 최적인 경험을 위해
                <br />
                PC 웹 환경(너비 1024px 이상)에 최적화되어 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}

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
