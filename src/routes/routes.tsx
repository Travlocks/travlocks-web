import React from 'react';

export const lazyRoutes = {
  BlockPage: React.lazy(() => import('../pages/BlockPage')),
  HomePage: React.lazy(() => import('../pages/HomePage')),
  LoginPage: React.lazy(() => import('../pages/LoginPage')),
  MyPage: React.lazy(() => import('../pages/MyPage')),
  ResetPasswordPage: React.lazy(() => import('../pages/ResetPasswordPage')),
  SignupPage: React.lazy(() => import('../pages/SignupPage')),
  TemplatePage: React.lazy(() => import('../pages/TemplatePage')),
};
