import Navbar from '@components/Navbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

interface DefaultLayoutProps {
  showNavbar?: boolean;
}

const DefaultLayout = ({ showNavbar = true }: DefaultLayoutProps) => {
  return (
    <div>
      {showNavbar && <Navbar />}

      <main>
        <Suspense fallback={'로딩 중...'}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default DefaultLayout;
