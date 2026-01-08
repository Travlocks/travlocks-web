import Navbar from '@components/Navbar';
import MainBg from '@components/MainBg';
import { Suspense, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import SplashFlow from '@/components/splash/SplashFlow';

const HomeLayout = () => {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeRoute = location.pathname === '/';

  return (
    <>
      <div className="relative w-full h-dvh overflow-hidden">
        {/* 메인 배경 */}
        <MainBg />

        {/* 스플래시 플로우 */}
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            if (isHomeRoute) {
              navigate('/login');
            }
          }}>
          {showSplash && isHomeRoute && (
            <SplashFlow
              key="splash"
              onDone={() => {
                setShowSplash(false);
              }}
            />
          )}
        </AnimatePresence>

        {/* 스플래시 완료 후 메인 콘텐츠 렌더링 */}
        {!showSplash && (
          <div className="relative z-10">
            <Navbar />
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeLayout;
