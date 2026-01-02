import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();
  const hasNavbarPaths = ['/', '/block', '/template']; // Navbar 있는 경로

  if (!hasNavbarPaths.includes(pathname)) return null;

  return <nav>네비게이션바</nav>;
};

export default Navbar;
