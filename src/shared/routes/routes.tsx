import React from 'react';

export const lazyRoutes = {
  /** 로그인 관련 페이지 */
  LoginPage: React.lazy(() => import('../../pages/LoginPage')),
  SignupPage: React.lazy(() => import('../../pages/SignupPage')),
  ResetPasswordPage: React.lazy(() => import('../../pages/ResetPasswordPage')),
  PasswordResetConfirmPage: React.lazy(() => import('../../pages/PasswordResetConfirmPage')),

  /** 소셜 로그인 콜백 페이지 */
  GoogleCallbackPage: React.lazy(() => import('../../pages/GoogleCallbackPage')),
  NaverCallbackPage: React.lazy(() => import('../../pages/NaverCallbackPage')),

  /** OAuth 온보딩 페이지 */
  OAuthOnboardingPage: React.lazy(() => import('../../pages/OAuthOnboardingPage')),

  /** 홈 페이지 */
  HomePage: React.lazy(() => import('../../pages/HomePage')),

  /** 블록 페이지 */
  BlockPage: React.lazy(() => import('../../pages/BlockPage/BlockPage')),
  OnboardingPage: React.lazy(() => import('../../pages/BlockPage/OnboardingPage')),
  TimelinePage: React.lazy(() => import('../../pages/BlockPage/TimelinePage')),

  /** 템플릿 페이지 */
  TemplatePage: React.lazy(() => import('../../pages/TemplatePage')),

  /** 마이페이지 */
  MyPage: React.lazy(() => import('../../pages/MyPage/MyPage')),
  SettingsPage: React.lazy(() => import('../../pages/MyPage/SettingsPage')),
};
