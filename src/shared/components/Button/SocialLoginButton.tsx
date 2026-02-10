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

interface SocialLoginButtonProps {
  provider: 'naver' | 'google';
  onClick: () => void;
}

const SocialLoginButton = ({ provider, onClick }: SocialLoginButtonProps) => {
  const buttonConfig = {
    naver: {
      ariaLabel: '네이버 로그인',
      bgColor: 'bg-[#03EB66]',
      borderColor: 'border-[#03EB66]',
      icon: <IconBase icon={NaverIcon} size={51} />,
    },
    google: {
      ariaLabel: '구글 로그인',
      bgColor: 'bg-base-color-6',
      borderColor: 'border-base-color-3',
      icon: <IconBase icon={GoogleIcon} size={51} fill="#ffffff" />,
    },
  };

  const config = buttonConfig[provider];

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-[51px] h-[51px] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity',
        config.bgColor,
        config.borderColor && `border ${config.borderColor}`,
      )}
      aria-label={config.ariaLabel}>
      {config.icon}
    </button>
  );
};

export default SocialLoginButton;
