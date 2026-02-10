import Dashboard from '@/feature/mypage/components/Dashboard';
import clsx from 'clsx';

const MyPage = () => {
  return (
    // TODO: bg 색 확인?
    <div className={clsx('bg-[#F8FAFC] px-92')}>
      <Dashboard />
    </div>
  );
};

export default MyPage;
