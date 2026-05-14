import type { Meta, StoryObj } from '@storybook/react-vite';
import { useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthNavButton from '@/shared/components/Button/AuthNavButton';
import SocialLoginButton from '@/shared/components/Button/SocialLoginButton';
import Button from '@/shared/components/Button/Button';
import { TravlocksWordmark } from '@/shared/components/TravlocksWordmark/TravlocksWordmark';
import AuthLayout from '@/shared/layouts/auth/AuthLayout';
import { AUTH_HEADER } from '@/shared/layouts/auth/authHeaderPresets';
import { useAuthLayoutHeader } from '@/shared/layouts/auth/useAuthLayoutHeader';

import { LoginView } from './LoginView';

const COPY = '조립하는 즐거움, 나만의 여행 블록 쌓기';

/** 리디자인 이전에 가깝게 재구성한 정적 스냅샷(동작 없음, 레이아웃·타이포·간격 비교용) */
function LegacyLoginSnapshot() {
  return (
    <div className="flex animate-fade-in justify-center px-4 py-8">
      <div className="w-full max-w-[585px] rounded-[30px] border border-[rgba(34,34,34,0.1)] bg-base-color-6 px-[43px] py-[48px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-5px_rgba(0,0,0,0.1)]">
        <div className="mb-[28px] flex justify-center">
          <TravlocksWordmark className="h-[89px] w-full" style={{ maxWidth: 373 }} />
        </div>
        <p className="b2 text-center text-base-color-1">{COPY}</p>
        <div className="mb-12 mt-12 flex justify-center">
          <AuthNavButton />
        </div>

        <div className="mx-auto flex max-w-[500px] flex-col gap-[25px]">
          <div className="flex flex-col gap-2">
            <div className="b6 text-base-color-1">이메일 (예전: 상단 라벨 + h-60 · px-18 · py-16)</div>
            <div className="b4 h-[60px] rounded-[10px] border border-negative bg-base-color-6 px-[18px] py-[16px] text-base-color-3">
              잘못된 이메일 예시
            </div>
            <span className="text-negative b6 flex items-center gap-2 px-[22px]">이메일 형식이 올바르지 않습니다.</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative">
              <div className="b6 text-base-color-1">비밀번호 (예전: 이메일 오류 시에도 테두리 강조)</div>
              <div className="b4 mt-1 h-[60px] rounded-[10px] border border-negative bg-base-color-6 px-[18px] py-[16px] text-base-color-3">
                ••••••••
              </div>
              <div className="absolute right-[8px] top-full mt-[35px]">
                <span className="b6 text-base-color-1 underline">비밀번호를 잊으셨나요?</span>
              </div>
            </div>
            <div className="min-h-[44px]" />
          </div>

          <div className="relative mb-[7.5px] mt-[-10px] flex items-center justify-center">
            <div className="absolute h-px w-full bg-black/10" />
            <span className="b2 text-base-color-3 relative bg-base-color-6 px-[8px]">Or</span>
          </div>

          <div className="mb-[23px] flex justify-center gap-[20px]">
            <SocialLoginButton provider="naver" onClick={() => undefined} />
            <SocialLoginButton provider="google" onClick={() => undefined} />
          </div>

          <Button text="로그인하고 시작하기" type="button" disabled className="rounded-[10px]" />
        </div>
      </div>
    </div>
  );
}

function CurrentLoginWithHeader() {
  const { setAuthHeader, resetAuthHeader } = useAuthLayoutHeader();

  useLayoutEffect(() => {
    setAuthHeader(AUTH_HEADER.login);
    return () => resetAuthHeader();
  }, [setAuthHeader, resetAuthHeader]);

  return <LoginView />;
}

const meta = {
  title: 'Feature/Auth/LoginView',
  component: LoginView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', memoryRouter: { initialEntries: ['/login'] } },
} satisfies Meta<typeof LoginView>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 리디자인(Figma 그리드) 적용 **이전**과 **현재**를 한 화면에서 대조합니다.
 *
 * - **이전**: 카드 585px·패딩 43/48px, 카피 `b2`, 폼 `gap-[25px]`, 오류 메시지 단일 영역·두 필드 동시 에러 테두리, 소셜 2종·간격 20px, Or 주변 음수 마진 등 과거 구현을 정적으로 재현했습니다.
 * - **현재**: 실제 `AuthLayout` + `LoginView`(React Query·라우터 포함)로 동작하는 화면입니다.
 */
export const CompareLegacyAndCurrent: Story = {
  name: '이전 UI vs 현재',
  render: () => (
    <div className="min-h-dvh bg-base-color-5 pb-16 pt-10">
      <header className="mx-auto mb-10 max-w-[1100px] px-4 text-center">
        <h1 className="h6 text-base-color-0">로그인 모달: 이전 UI vs 현재</h1>
        <p className="b2 mt-2 text-base-color-1">
          왼쪽은 과거 마크업/간격을 스토리에서 재구성한 참고용 스냅샷이고, 오른쪽은 실제 코드 경로입니다.
        </p>
      </header>

      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-center gap-12 px-4 lg:flex-row lg:items-start lg:justify-between">
        <section className="flex w-full flex-1 flex-col items-center lg:max-w-[640px]">
          <h2 className="h8 text-primary-color mb-2">이전 (스냅샷)</h2>
          <ul className="b6 text-base-color-1 mb-6 max-w-[420px] list-disc space-y-1 pl-5 text-left">
            <li>카드 max 585px, 패딩 43px / 48px</li>
            <li>카피: b2 (24px)</li>
            <li>탭·폼: mt-12 · mb-12 (과거 타이트한 간격)</li>
            <li>폼 세로: gap 25px 고정</li>
            <li>이메일 검증 오류 시 비밀번호 필드도 빨간 테두리</li>
            <li>소셜: 네이버·구글만, gap 20px</li>
            <li>Or: mt -10px 등 혼합 마진</li>
          </ul>
          <LegacyLoginSnapshot />
        </section>

        <section className="flex w-full flex-1 flex-col items-center lg:max-w-[640px]">
          <h2 className="h8 text-primary-color mb-2">현재 (실제 컴포넌트)</h2>
          <ul className="b6 text-base-color-1 mb-6 max-w-[420px] list-disc space-y-1 pl-5 text-left">
            <li>카드 max 588px, 패딩 44px</li>
            <li>카피: t2 (20px Medium)</li>
            <li>탭↔카피 48px, 탭↔첫 필드 60px</li>
            <li>필드 간 24px, 이메일 오류는 필드 아래·비밀번호는 API 오류만</li>
            <li>입력: h 61px, px 28 · py 20</li>
            <li>소셜: 네이버·카카오·구글, gap 24px</li>
            <li>Or·CTA 간격 Figma 그리드에 맞춤</li>
          </ul>
          <div className="w-full">
            <Routes>
              <Route element={<AuthLayout memberRoutes />}>
                <Route path="login" element={<CurrentLoginWithHeader />} />
              </Route>
            </Routes>
          </div>
        </section>
      </div>
    </div>
  ),
};
