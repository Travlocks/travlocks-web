import Navbar from '@components/Navbar';
import MainBg from '@components/MainBg';
import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Splash from '@pages/Splash';
import { AnimatePresence } from 'motion/react';

const HomeLayout = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <div className="relative w-full h-dvh overflow-hidden">
        <MainBg />

        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            setSplashDone(true);
          }}>
          {showSplash && (
            <Splash
              key="splash"
              onDone={() => {
                setShowSplash(false);
              }}
            />
          )}
        </AnimatePresence>

        {splashDone && (
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
