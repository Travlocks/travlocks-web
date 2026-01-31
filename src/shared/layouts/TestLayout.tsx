import { Outlet } from 'react-router-dom';

const TestLayout = () => {
  return (
    <div className="relative w-full min-h-dvh overflow-hidden" aria-label="테스트 레이아웃">
      <h1>TestLayout</h1>
      <Outlet />
    </div>
  );
};

export default TestLayout;
