/**
 * 소셜 로그인 버튼 컴포넌트
 *
 * @description
 * 네이버, 카카오, 구글 소셜 로그인 버튼을 제공하는 컴포넌트입니다.
 * 각 소셜 로그인 제공자에 맞는 스타일과 아이콘이 적용됩니다.
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
import GoogleIcon from '@assets/logo/logo-google.svg?react';
import KakaoIcon from '@assets/logo/logo-kakao.svg?react';

interface SocialLoginButtonProps {
  provider: 'naver' | 'kakao' | 'google';
  onClick: () => void;
}

const SocialLoginButton = ({ provider, onClick }: SocialLoginButtonProps) => {
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
    google: {
      ariaLabel: '구글 로그인',
      className: 'border border-base-color bg-base-color-6',
      icon: <IconBase icon={GoogleIcon} size={28} fill="#ffffff" />,
    },
  };

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
