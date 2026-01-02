import Navbar from '@/shared/components/Navbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <Navbar />

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default HomeLayout;
