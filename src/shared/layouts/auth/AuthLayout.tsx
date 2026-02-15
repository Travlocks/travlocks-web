import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthNavButton from '@/shared/components/Button/AuthNavButton';
import LogoAuth from '@assets/logo/logo-auth.svg?react';
import type { AuthLayoutHeader } from './AuthLayout.type';
import { useState } from 'react';
import type { AuthLayoutOutletCtx } from './AuthLayout.type';
import { useAuth } from '@/shared/hooks/useAuth';

/**
 * 인증 관련 페이지(로그인, 회원가입, 비밀번호 재설정)에서 사용되는 공통 레이아웃
 *
 * @description
 * 로고, 카피 문구, 로그인/회원가입 탭 네비게이션을 포함하는 공통 UI를 제공합니다.
 *
 * @author seongmin36
 */

const DEFAULT_HEADER: AuthLayoutHeader = {
  subtitle: undefined,
  description: undefined,
  showAuthNav: false,
};

interface AuthLayoutProps {
  memberRoutes?: boolean;
}

const AuthLayout = ({ memberRoutes = false }: AuthLayoutProps) => {
  const location = useLocation();
  const [header, setHeader] = useState<AuthLayoutHeader>(DEFAULT_HEADER);
  const { shouldRequireMember } = useAuth();

  console.log('AuthLayout 렌더링', { memberRoutes, path: location.pathname });

  // 멤버 전용 라우트
  if (memberRoutes && shouldRequireMember) {
    return <Navigate to="/" replace />;
  }

  // 헤더 교체 함수
  const setAuthHeader = (next: AuthLayoutHeader) => {
    setHeader(next);
  };

  const updateAuthHeader = (patch: Partial<AuthLayoutHeader>) => {
    setHeader((prev) => ({ ...prev, ...patch }));
  };

  const resetAuthHeader = () => {
    setHeader(DEFAULT_HEADER);
  };

  const ctx = {
    header,
    setAuthHeader,
    updateAuthHeader,
    resetAuthHeader,
  } satisfies AuthLayoutOutletCtx;

  const { subtitle, description, showAuthNav = false } = header;

  return (
    <div key={location.pathname} className="flex justify-center animate-fade-in items-center min-h-dvh px-4 py-8">
      <div className="w-full max-w-[585px] bg-base-color-6 rounded-[30px] border border-[rgba(34,34,34,0.1)] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-5px_rgba(0,0,0,0.1)] px-[43px] py-[48px]">
        {/* 로고 */}
        <div className="flex justify-center mb-[28px]">
          <LogoAuth className="w-[367px] h-[89px]" />
        </div>

        {subtitle && <p className="h2 text-[23px] text-black text-center mb-5 whitespace-pre-wrap">{subtitle}</p>}
        {/* 카피 문구 */}
        {description && (
          <p className="b2 text-base-color-1 text-center font-normal whitespace-pre-wrap">{description}</p>
        )}

        {/* 로그인 / 회원가입 / 비밀번호 재설정 탭 */}
        {showAuthNav && (
          <div className="mb-15 mt-12">
            <AuthNavButton />
          </div>
        )}

        {/* Child 컴포넌트 */}
        <Outlet context={ctx} />
      </div>
    </div>
  );
};

export default AuthLayout;
