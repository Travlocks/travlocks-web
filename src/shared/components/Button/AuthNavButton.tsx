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
    <nav className="max-w-[500px] w-full h-[47px] border border-primary-color bg-base-color-6 rounded-[5px] flex">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            clsx(
              'b3 w-1/2 flex items-center justify-center relative',
              isActive ? 'bg-primary-color text-base-color-6' : 'text-primary-color',
            )
          }>
          {({ isActive }) => (
            <>
              {link.label}

              {/* 로그인 버튼 옆 블록 부분 */}
              {link.to === '/login' && (
                <div
                  className={clsx(
                    'w-[11px] h-[23px] absolute right-[-11px] z-content',
                    isActive ? 'bg-primary-color' : 'bg-base-color-6',
                  )}></div>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default AuthNavButton;
