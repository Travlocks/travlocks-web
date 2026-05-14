import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

/**
 * 로그인, 회원가입 페이지에서 사용되는 네비게이션 컴포넌트입니다.
 * 각 버튼 클릭 시 로그인, 회원가입 페이지로 이동하며,
 * 별도의 props 없이 공통 컴포넌트로 사용됩니다.
 *
 * @example
 * <AuthNavButton />
 *
 * @author 김진효
 * **/

const LINKS = [
  { label: '로그인', to: '/login' },
  { label: '회원가입', to: '/signup' },
];

const AuthNavButton = () => {
  return (
    <nav className="flex h-[48px] w-full max-w-[500px] overflow-hidden rounded-[5px] border border-primary-color bg-base-color-6">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            clsx(
              'h9 flex w-1/2 items-center justify-center px-6 py-[12px]',
              isActive ? 'bg-primary-color text-base-color-6' : 'bg-base-color-6 text-primary-color',
            )
          }>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default AuthNavButton;
