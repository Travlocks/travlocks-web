import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import AuthNavButton from '@/shared/components/Button/AuthNavButton';
import Button from '@/shared/components/Button/Button';
import SocialLoginButton from '@/shared/components/Button/SocialLoginButton';
import Input from '@/shared/components/Form/Input';
import Alert from '@/shared/components/Form/Alert';
import { loginSchema, type LoginFormData } from '@/shared/utils/validationSchemas';
import LogoAuth from '@assets/logo/logo-auth.svg?react';

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
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormData) => {
    // TODO: 백엔드 API 연동
    console.log('로그인 데이터:', data);
  };

  const handleSocialLogin = (provider: 'naver' | 'kakao' | 'google') => {
    // TODO: 소셜 로그인 API 연동
    console.log(`${provider} 로그인 클릭`);
  };

  return (
    <div className="flex justify-center items-center min-h-dvh px-4 py-8">
      <div className="w-full max-w-[585px] bg-base-color-6 rounded-[30px] border border-[rgba(34,34,34,0.1)] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-5px_rgba(0,0,0,0.1)] px-[43px] py-[48px]">
        {/* 로고 */}
        <div className="flex justify-center mb-[28px]">
          <LogoAuth className="w-[367px] h-[89px]" />
        </div>

        {/* 카피 문구 */}
        <p className="t2 text-base-color-2 text-center mb-12">조립하는 즐거움, 나만의 여행 블록 쌓기</p>

        {/* 로그인/회원가입 탭 */}
        <div className="mb-15">
          <AuthNavButton />
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[25px]">
          {/* 이메일 입력 필드 */}
          <div className="flex flex-col gap-[8px]">
            <Input
              register={register('email')}
              type="email"
              label="top"
              placeholder="이메일을 입력해주세요"
              error={!!errors.email}
            />
            {errors.email && <Alert text={errors.email.message || ''} type="alert" width={500} />}
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="flex flex-col gap-[8px]">
            <div className="relative">
              <Input
                register={register('password')}
                type="password"
                label="top"
                placeholder="비밀번호를 입력해주세요"
                error={!!errors.password}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isValid) {
                    handleSubmit(onSubmit)();
                  }
                }}
              />
              {/* `비밀번호를 잊으셨나요?` 링크 */}
              <Link to="/password" className="absolute right-0 top-full mt-[40px] t3 text-base-color-2 underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>

            <div className="min-h-[56px]">
              {errors.password ? <Alert text={errors.password.message || ''} type="alert" width={500} /> : null}
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
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
            className="rounded-[10px]"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
