import type { LoginFormData } from '@/shared/utils/validationSchemas';
import { useLoginForm } from '../hooks/useLoginForm';
import SocialLoginButton from '@/shared/components/Button/SocialLoginButton';
import Button from '@/shared/components/Button/Button';
import Input from '@/shared/components/Form/Input';
import { Link } from 'react-router-dom';
import { IconBase } from '@/shared/ui/icon/IconBase';
import XIcon from '@assets/icon-circle-x.svg?react';

/**
 * 로그인 페이지 컴포넌트
 *
 * @description
 * 사용자 로그인을 위한 페이지입니다.
 * 이메일과 비밀번호를 입력받아 로그인을 처리합니다.
 * 소셜 로그인(네이버, 카카오, 구글) 옵션도 제공합니다.
 *
 * @author seomgin36
 */

export const LoginView = () => {
  const onSubmit = (data: LoginFormData) => {
    // TODO: 백엔드 API 연동
    console.log('로그인 데이터:', data);
  };

  const handleSocialLogin = (provider: 'naver' | 'kakao' | 'google') => {
    // TODO: 소셜 로그인 API 연동
    console.log('소셜 로그인 프로바이더:', provider);
  };

  const { canSubmit, submit, register, isSubmitting, inlineMessage } = useLoginForm(onSubmit);

  return (
    <>
      {/* 로그인 폼 */}
      <form onSubmit={submit} className="flex flex-col gap-[25px]">
        {/* 이메일 입력 필드 */}
        <div className="flex flex-col gap-[8px]">
          <Input
            register={register('email')}
            type="email"
            label="top"
            placeholder="이메일을 입력해주세요"
            error={!!inlineMessage}
          />
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Input
              register={register('password')}
              type="password"
              label="top"
              placeholder="비밀번호를 입력해주세요"
              error={!!inlineMessage}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canSubmit) {
                  submit();
                }
              }}
            />
            {/* `비밀번호를 잊으셨나요?` 링크 */}
            <Link to="/password" className="absolute right-[8px] top-full mt-[35px] t3 text-base-color-2 underline">
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          <div className="min-h-[44px]">
            {inlineMessage ? (
              <span className="t3 text-[16px] text-negative px-[22px] flex items-center gap-2">
                <IconBase icon={XIcon} width="17px" height="17px" fill="#FD7565" />
                <p>{inlineMessage}</p>
              </span>
            ) : null}
          </div>
        </div>

        {/* 소셜 로그인 구분선 */}
        <div className="relative flex items-center justify-center mt-[-10px] mb-[7.5px]">
          <div className="absolute w-full h-px bg-black/10"></div>
          <div className="relative bg-base-color-6 px-[8px]">
            <span className="b1 text-[#717182]">Or</span>
          </div>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="flex justify-center items-center gap-[20px] mb-[23px]">
          <SocialLoginButton provider="naver" onClick={() => handleSocialLogin('naver')} />
          <SocialLoginButton provider="kakao" onClick={() => handleSocialLogin('kakao')} />
          <SocialLoginButton provider="google" onClick={() => handleSocialLogin('google')} />
        </div>

        {/* 로그인 버튼 */}
        <Button
          text="Vlock 쌓으러 가기"
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="rounded-[10px]"
        />
      </form>
    </>
  );
};
