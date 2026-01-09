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

import { IconBase } from '@/shared/ui/icon/IconBase';
import NaverIcon from '@assets/logo/logo-naver.svg?react';
import KakaoIcon from '@assets/logo/logo-kakao.svg?react';
import GoogleIcon from '@assets/logo/logo-google.svg?react';

interface SocialLoginButtonProps {
  provider: 'naver' | 'kakao' | 'google';
  onClick: () => void;
}

const SocialLoginButton = ({ provider, onClick }: SocialLoginButtonProps) => {
  const buttonConfig = {
    naver: {
      ariaLabel: '네이버 로그인',
      bgColor: 'bg-[#03EB66]',
      borderColor: 'border-base-color-3',
      icon: <IconBase icon={NaverIcon} width="51px" height="51px" />,
    },
    kakao: {
      ariaLabel: '카카오 로그인',
      bgColor: 'bg-[#FFE812]',
      borderColor: '',
      icon: <IconBase icon={KakaoIcon} width="51px" height="51px" />,
    },
    google: {
      ariaLabel: '구글 로그인',
      bgColor: 'bg-base-color-6',
      borderColor: 'border-base-color-3',
      icon: <IconBase icon={GoogleIcon} width="51px" height="51px" fill="#ffffff" />,
    },
  };

  const config = buttonConfig[provider];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[51px] h-[51px] rounded-full ${config.bgColor} flex items-center justify-center ${config.borderColor ? `border ${config.borderColor}` : ''} hover:opacity-80 transition-opacity`}
      aria-label={config.ariaLabel}>
      {config.icon}
    </button>
  );
};

export default SocialLoginButton;
