import Navbar from '@components/Navbar';
import MainBg from '@components/MainBg';
import SplashFlow from '@/feature/splash/SplashFlow';
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

interface DefaultLayoutProps {
  showNavbar?: boolean;
}

const DefaultLayout = ({ showNavbar = true }: DefaultLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomeRoute = location.pathname === '/';
  // 스플래시 표시 여부 저장
  const showSplashStorage = sessionStorage.getItem('showSplash');
  const [showSplash, setShowSplash] = useState(showSplashStorage !== 'false');

  // 홈 페이지에서 스플래시 표시 여부 저장
  useEffect(() => {
    if (!showSplash && isHomeRoute) {
      sessionStorage.setItem('showSplash', 'false');
    }
  }, [showSplash, isHomeRoute]);

  // 인증 페이지 목록
  const AUTH_PAGES = ['/login', '/signup', '/password'];
  const isAuthPage = AUTH_PAGES.includes(location.pathname);

  return (
    <div className="relative w-full min-h-dvh overflow-hidden">
      {/* 메인 배경 */}
      {showSplash || isAuthPage ? <MainBg /> : <div className="absolute inset-0 z-0 bg-base-color-6" />}
      {/* 스플래시 플로우 */}
      {isHomeRoute && (
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            navigate('/login');
          }}>
          {showSplash && (
            <SplashFlow
              key="splash"
              onDone={() => {
                setShowSplash(false);
              }}
            />
          )}
        </AnimatePresence>
      )}
      {/* 스플래시 완료 후 메인 콘텐츠 렌더링 */}
      {!showSplash && (
        <div className="relative z-10">
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
