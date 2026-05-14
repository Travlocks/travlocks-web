import type { Meta, StoryObj } from '@storybook/react-vite';
import { useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TravlocksWordmark } from '@/shared/components/TravlocksWordmark/TravlocksWordmark';

import { AUTH_HEADER } from './authHeaderPresets';
import AuthLayout from './AuthLayout';
import { useAuthLayoutHeader } from './useAuthLayoutHeader';

function AuthHeaderStub({ preset, caption }: { preset: 'login' | 'signup'; caption: string }) {
  const { setAuthHeader, resetAuthHeader } = useAuthLayoutHeader();

  useLayoutEffect(() => {
    setAuthHeader(AUTH_HEADER[preset]);
    return () => resetAuthHeader();
  }, [preset, setAuthHeader, resetAuthHeader]);

  return <p className="b2 mt-4 text-center text-base-color-1">{caption}</p>;
}

function WordmarkComparePanel({
  title,
  description,
  maxWidthPx,
}: {
  title: string;
  description: string;
  maxWidthPx: number;
}) {
  return (
    <div className="w-full max-w-[400px] rounded-[30px] border border-[rgba(34,34,34,0.1)] bg-base-color-6 px-10 py-8 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-5px_rgba(0,0,0,0.1)]">
      <p className="h2 mb-1 text-center text-[18px] text-black">{title}</p>
      <p className="b2 mb-6 text-center text-base-color-1">{description}</p>
      <div className="flex justify-center">
        <TravlocksWordmark className="h-[89px] w-full" style={{ maxWidth: maxWidthPx }} />
      </div>
    </div>
  );
}

const meta = {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 실제 `/login`과 동일하게 `AUTH_HEADER.login` → 워드마크 max-width 373px */
export const LoginWordmark: Story = {
  name: '로그인 워드마크 (373px)',
  parameters: { memoryRouter: { initialEntries: ['/login'] } },
  render: () => (
    <Routes>
      <Route element={<AuthLayout memberRoutes />}>
        <Route
          path="login"
          element={<AuthHeaderStub preset="login" caption="AUTH_HEADER.login · wordmarkMaxWidthPx: 373" />}
        />
      </Route>
    </Routes>
  ),
};

/** 기본 인증 카드 워드마크 max-width 367px */
export const SignupWordmark: Story = {
  name: '회원가입 워드마크 (367px)',
  parameters: { memoryRouter: { initialEntries: ['/signup'] } },
  render: () => (
    <Routes>
      <Route element={<AuthLayout memberRoutes />}>
        <Route path="signup" element={<AuthHeaderStub preset="signup" caption="AUTH_HEADER.signup · 기본 367px" />} />
      </Route>
    </Routes>
  ),
};

/** 로그인 화면 기준: 예전 통일 너비(367) vs 현재 로그인 전용(373) */
export const LoginWordmarkLegacyVsCurrent: Story = {
  name: '로그인 워드마크 비교 (367 vs 373)',
  render: () => (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-white px-4 py-12 lg:flex-row lg:items-start">
      <WordmarkComparePanel title="구버전" description="로그인도 367px (회원가입 등과 동일)" maxWidthPx={367} />
      <WordmarkComparePanel title="현재" description="로그인만 373px (wordmarkMaxWidthPx)" maxWidthPx={373} />
    </div>
  ),
};
