/**
 * 소셜 로그인 버튼 컴포넌트
 *
 * @description
 * 네이버, 카카오, 구글 소셜 로그인 버튼을 제공하는 컴포넌트입니다.
 * 구글은 Google Sign-In material 버튼 마크업(gsi-material-button)을 참고한 구조를 사용합니다.
 *
 * @param {'naver' | 'kakao' | 'google'} provider - 소셜 로그인 제공자
 * @param {function} onClick - 버튼 클릭 시 실행될 콜백 함수
 *
 * @example
 * <SocialLoginButton provider="naver" onClick={() => handleSocialLogin('naver')} />
 * <SocialLoginButton provider="kakao" onClick={() => handleSocialLogin('kakao')} />
 * <SocialLoginButton provider="google" onClick={() => handleSocialLogin('google')} />
 *
 * @author seomgin36
 */

import clsx from 'clsx';
import { IconBase } from '@/shared/ui/icon/IconBase';
import NaverIcon from '@assets/logo/logo-naver.svg?react';
import KakaoIcon from '@assets/logo/logo-kakao.svg?react';

interface SocialLoginButtonProps {
  provider: 'naver' | 'kakao' | 'google';
  onClick: () => void;
}

/** Google 브랜드 가이드 48×48 G 마크 (material 버튼 예시 SVG와 동일) */
function GoogleMaterialIcon() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}

const SocialLoginButton = ({ provider, onClick }: SocialLoginButtonProps) => {
  if (provider === 'google') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="gsi-material-button social-gsi-material-button"
        aria-label="구글 로그인">
        <div className="gsi-material-button-state" aria-hidden />
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
            <GoogleMaterialIcon />
          </div>
          <span className="sr-only">Google로 로그인</span>
        </div>
      </button>
    );
  }

  const buttonConfig = {
    naver: {
      ariaLabel: '네이버 로그인',
      className: 'border border-[#03EB66] bg-[#03EB66]',
      icon: <IconBase icon={NaverIcon} size={50} />,
    },
    kakao: {
      ariaLabel: '카카오 로그인',
      className: 'border border-[#FEE500] bg-[#FEE500]',
      icon: <IconBase icon={KakaoIcon} size={32} />,
    },
  } as const;

  const config = buttonConfig[provider];

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex size-[50px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-80',
        config.className,
      )}
      aria-label={config.ariaLabel}>
      {config.icon}
    </button>
  );
};

export default SocialLoginButton;
