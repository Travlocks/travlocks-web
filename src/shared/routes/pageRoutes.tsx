import DefaultLayout from '@/shared/layouts/DefaultLayout';
import AuthLayout from '@/shared/layouts/auth/AuthLayout';
import TestLayout from '@/shared/layouts/TestLayout';
import FeatureLayout from '@/shared/layouts/FeatureLayout';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyRoutes } from './routes';
import TestPage from '@/pages/TestPage';
import NotFoundPage from '@/shared/components/Exception/NotFoundPage';
import Loading from '@/shared/components/Exception/Loading';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout protectedRoutes />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <lazyRoutes.HomePage />,
      },
      {
        path: 'block',
        children: [
          {
            index: true,
            element: <Navigate to="/block/onboarding" replace />,
          },
          {
            path: 'onboarding',
            element: <lazyRoutes.OnboardingPage />,
          },
          {
            path: ':templateId',
            element: (
              <Suspense fallback={<Loading />}>
                <lazyRoutes.BlockPage />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: 'template',
        element: <lazyRoutes.TemplatePage />,
      },
      {
        path: 'mypage',
        children: [
          {
            index: true,
            element: <lazyRoutes.MyPage />,
          },
          {
            path: 'settings',
            element: <lazyRoutes.SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    element: <DefaultLayout showNavbar={false} />,
    children: [
      {
        element: <AuthLayout memberRoutes />,
        children: [
          {
            path: 'login',
            element: <lazyRoutes.LoginPage />,
          },
          {
            path: 'signup',
            element: <lazyRoutes.SignupPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'password',
            element: <lazyRoutes.ResetPasswordPage />,
          },
          {
            path: 'password-reset',
            element: <lazyRoutes.PasswordResetConfirmPage />,
            handle: { skipSplash: true, skipSessionGate: true },
          },
          {
            path: 'onboarding',
            element: <lazyRoutes.OAuthOnboardingPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'google/callback',
    element: <lazyRoutes.GoogleCallbackPage />,
  },
  {
    path: 'naver/callback',
    element: <lazyRoutes.NaverCallbackPage />,
  },
  {
    path: '/test',
    element: <TestLayout />,
    children: [
      {
        index: true,
        element: <TestPage />,
      },
      {
        element: (
          <FeatureLayout subtitle="다른 여행자들의 블록을 탐색하고 내 블록으로 리믹스해요!" title="템플릿 탐색" />
        ),
        children: [
          {
            path: 'template',
            element: <lazyRoutes.TemplatePage />,
          },
        ],
      },
      {
        path: 'onboarding',
        element: <lazyRoutes.OnboardingPage />,
      },
    ],
  },
];

export const router = createBrowserRouter([...routes]);
