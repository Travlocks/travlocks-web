import Navbar from '@components/Navbar';
import MainBg from '@components/MainBg';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <div className="relative w-full h-dvh overflow-hidden">
        <MainBg />
        <div className="relative z-10">
          <Navbar />

          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
