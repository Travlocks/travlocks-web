import { useState } from 'react';
import type { LoginFormData } from '@/shared/utils/validationSchemas';
import { useLoginForm } from '../hooks/useLoginForm';
import { useLoginMutation } from '../hooks/useLoginMutation';
import { useSocialLogin } from '../hooks/useSocialLogin';
import SocialLoginButton from '@/shared/components/Button/SocialLoginButton';
import Button from '@/shared/components/Button/Button';
import Input from '@/shared/components/Form/Input';
import { Link } from 'react-router-dom';
import { AppIcon } from '@/shared/ui/icon/AppIcon';
import clsx from 'clsx';

/**
 * 로그인 페이지 컴포넌트
 *
 * @description
 * 사용자 로그인을 위한 페이지입니다.
 * 이메일과 비밀번호를 입력받아 로그인을 처리합니다.
 * 소셜 로그인(네이버, 카카오, 구글) 옵션도 제공합니다.
 *
 * @author seongmin36
 */

export const LoginView = () => {
  const [apiError, setApiError] = useState<string | null>(null);

  const { mutate: loginMutation, isPending } = useLoginMutation({
    onError: (_error, errorMessage) => {
      setApiError(errorMessage);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setApiError(null);
    loginMutation({
      email: data.email,
      password: data.password,
    });
  };

  const { handleSocialLogin } = useSocialLogin();

  const { canSubmit, submit, register, isSubmitting, inlineMessage } = useLoginForm(onSubmit);
  const emailErrorMessage = inlineMessage;
  const isLoginPending = isPending || isSubmitting;

  return (
    <form onSubmit={submit} className="flex max-w-[500px] flex-col">
      {/* 이메일 — 피그마: 탭↔첫 필드 간격은 AuthLayout mb-[60px] */}
      <div className="flex flex-col">
        <Input
          register={register('email')}
          type="email"
          label="top"
          placeholder="이메일을 입력해주세요"
          error={!!emailErrorMessage}
        />
        {emailErrorMessage ? (
          <span className="text-negative mt-3 flex items-center gap-2 px-0 b6">
            <AppIcon name="alert" width="17px" height="17px" color="#fd7565" />
            <span>{emailErrorMessage}</span>
          </span>
        ) : null}
      </div>

      {/* 비밀번호: 이메일 필드↔24px, 이메일 오류 시 오류↔비밀번호 라벨 4px */}
      <div className={clsx('flex flex-col', emailErrorMessage ? 'mt-1' : 'mt-6')}>
        <Input
          register={register('password')}
          type="password"
          label="top"
          placeholder="비밀번호를 입력해주세요"
          error={!!apiError}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canSubmit && !isLoginPending) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <div className="mt-[35px] flex justify-end">
          <Link to="/password" className="b6 font-medium text-base-color-1 underline">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        {apiError ? (
          <span className="text-negative mt-3 flex items-center gap-2 b6">
            <AppIcon name="alert" width="17px" height="17px" color="#fd7565" />
            <span>{apiError}</span>
          </span>
        ) : null}
      </div>

      {/* Or 구분선 — 상단 16px, 하단 32px(소셜 영역) */}
      <div className="relative mb-8 mt-4 flex w-full items-center">
        <div className="bg-base-color h-px w-full" />
        <span className="b6 text-base-color-3 bg-base-color-6 absolute left-1/2 -translate-x-1/2 px-2 font-medium">
          Or
        </span>
      </div>

      {/* 소셜: 아이콘 간격 24px */}
      <div className="flex justify-center gap-6">
        <SocialLoginButton provider="naver" onClick={() => handleSocialLogin('naver')} />
        <SocialLoginButton provider="kakao" onClick={() => handleSocialLogin('kakao')} />
        <SocialLoginButton provider="google" onClick={() => handleSocialLogin('google')} />
      </div>

      {/* 제출 버튼 — 피그마: 소셜↔48px, radius 10, 비활성 #9CA3AF */}
      <div className="mt-12 w-full">
        <Button
          text={isLoginPending ? '로그인 중...' : '로그인하고 시작하기'}
          type="submit"
          disabled={!canSubmit || isLoginPending}
          className="h9 !h-auto min-h-[48px] rounded-[10px] py-[24px] font-semibold"
        />
      </div>
    </form>
  );
};
