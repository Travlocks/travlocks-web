import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

/**
 * 로그인, 회원가입 페이지에서 사용되는 네비게이션 컴포넌트입니다.
 * Figma(2614:14858)처럼 활성 탭과 비활성 탭이 맞물리는 블록 형태로 보이도록 구성합니다.
 *
 * @example
 * <AuthNavButton />
 *
 * @author 김진효
 * **/

const LINKS = [
  { label: '로그인', to: '/login', side: 'left' as const },
  { label: '회원가입', to: '/signup', side: 'right' as const },
];

const AuthNavButton = () => {
  return (
    <nav
      aria-label="로그인 또는 회원가입"
      className="relative flex h-[48px] w-full max-w-[500px] overflow-hidden rounded-[5px] border border-primary-color bg-base-color-6">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            clsx(
              'h9 relative z-0 flex flex-1 items-center justify-center py-[12px] text-[20px] font-medium transition-colors',
              link.side === 'left' && [
                'rounded-bl-[5px] rounded-tl-[5px]',
                isActive ? 'z-[2] bg-primary-color text-base-color-6' : 'bg-base-color-6 text-primary-color',
              ],
              link.side === 'right' && [
                'rounded-br-[5px] rounded-tr-[5px]',
                isActive
                  ? 'z-[2] bg-primary-color text-base-color-6'
                  : 'border-l border-primary-color bg-base-color-6 text-primary-color',
              ],
            )
          }>
          {({ isActive }) => (
            <>
              {link.label}
              {/* 활성 탭과 비활성 탭 사이 맞물림 블록 (Figma: 블록) */}
              {isActive && link.side === 'left' ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-[-11px] top-1/2 z-[3] h-[23px] w-[11px] -translate-y-1/2 bg-primary-color"
                />
              ) : null}
              {isActive && link.side === 'right' ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-[-11px] top-1/2 z-[3] h-[23px] w-[11px] -translate-y-1/2 bg-primary-color"
                />
              ) : null}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default AuthNavButton;
