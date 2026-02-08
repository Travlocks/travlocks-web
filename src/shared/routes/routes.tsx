import React from 'react';

export const lazyRoutes = {
  /** 로그인 관련 페이지 */
  LoginPage: React.lazy(() => import('../../pages/LoginPage')),
  SignupPage: React.lazy(() => import('../../pages/SignupPage')),
  PasswordResetConfirmPage: React.lazy(() => import('../../pages/PasswordResetConfirmPage')),

  /** 홈 페이지 */
  HomePage: React.lazy(() => import('../../pages/HomePage')),

  /** 블록 페이지 */
  BlockPage: React.lazy(() => import('../../pages/BlockPage/BlockPage')),
  OnboardingPage: React.lazy(() => import('../../pages/BlockPage/OnboardingPage')),

  /** 템플릿 페이지 */
  TemplatePage: React.lazy(() => import('../../pages/TemplatePage')),

  /** 마이페이지 */
  MyPage: React.lazy(() => import('../../pages/MyPage')),
  ResetPasswordPage: React.lazy(() => import('../../pages/ResetPasswordPage')),
};
