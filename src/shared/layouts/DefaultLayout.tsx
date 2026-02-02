import Navbar from '@/shared/components/Navbar/Navbar';
import MainBg from '@components/MainBg';
import SplashFlow from '@/feature/splash/SplashFlow';
import { Suspense, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { SESSION_STORAGE_KEY } from '@constants/key';
import { useAuth } from '../hooks/useAuth';

interface DefaultLayoutProps {
  showNavbar?: boolean;
  protectedRoutes?: boolean;
}

const DefaultLayout = ({ showNavbar = true, protectedRoutes = false }: DefaultLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, shouldRequireAuth } = useAuth();
  const isHomeRoute = location.pathname === '/';

  // 스플래시 표시 여부 저장
  const showSplashStorage = sessionStorage.getItem(SESSION_STORAGE_KEY.showSplash);
  const [showSplash, setShowSplash] = useState(showSplashStorage !== 'false');

  // 스플래시 완료 시 세션 스토리지에 표시 여부 저장
  const handleSplashDone = () => {
    setShowSplash(false);
    if (!showSplashStorage) {
      sessionStorage.setItem(SESSION_STORAGE_KEY.showSplash, 'false');
    }
  };

  // 인증 페이지 목록
  const AUTH_PAGES = ['/login', '/signup', '/password'];
  const isAuthPage = AUTH_PAGES.includes(location.pathname);

  // 모든 사용자는 로그인 후에 서비스 이용 가능
  if (protectedRoutes && shouldRequireAuth && !showSplash && !isHomeRoute) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <div className="relative w-full min-h-dvh overflow-hidden" aria-label="메인 레이아웃">
      {/* 메인 배경 */}
      {showSplash || isAuthPage ? <MainBg /> : <div className="absolute inset-0 z-base bg-base-color-6" />}
      {/* 스플래시 플로우 */}
      {isHomeRoute && (
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            // 스플래시 완료 시 로그인 상태에 따라 처리
            if (protectedRoutes && !isAuthenticated) {
              navigate('/login', { replace: true, state: { from: location.pathname } });
            }
          }}>
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
