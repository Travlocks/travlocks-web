import { Outlet } from 'react-router-dom';
import AuthNavButton from '@/shared/components/Button/AuthNavButton';
import LogoAuth from '@assets/logo/logo-auth.svg?react';

/**
 * 인증 관련 페이지(로그인, 회원가입, 비밀번호 재설정)에서 사용되는 공통 레이아웃
 *
 * @description
 * 로고, 카피 문구, 로그인/회원가입 탭 네비게이션을 포함하는 공통 UI를 제공합니다.
 *
 * @author seomgin36
 */

interface AuthLayoutProps {
  subtitle?: string;
  description?: string;
  showAuthNav?: boolean;
}

const AuthLayout = ({ subtitle, description, showAuthNav = false }: AuthLayoutProps) => {
  return (
    <div className="flex justify-center items-center min-h-dvh px-4 py-8">
      <div className="w-full max-w-[585px] bg-base-color-6 rounded-[30px] border border-[rgba(34,34,34,0.1)] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-5px_rgba(0,0,0,0.1)] px-[43px] py-[48px]">
        {/* 로고 */}
        <div className="flex justify-center mb-[28px]">
          <LogoAuth className="w-[367px] h-[89px]" />
        </div>

        {subtitle && <p className="h2 text-[23px] text-black text-center mb-[23px] whitespace-pre-wrap">{subtitle}</p>}
        {/* 카피 문구 */}
        {description && (
          <p className="t2 text-base-color-2 text-center font-normal whitespace-pre-wrap">{description}</p>
        )}

        {/* 로그인 / 회원가입 / 비밀번호 재설정 탭 */}
        {showAuthNav && (
          <div className="mb-15 mt-12">
            <AuthNavButton />
          </div>
        )}

        {/* Child 컴포넌트 */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
