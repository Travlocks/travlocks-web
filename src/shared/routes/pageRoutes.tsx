import DefaultLayout from '@/shared/layouts/DefaultLayout';
import AuthLayout from '@/shared/layouts/auth/AuthLayout';
import TestLayout from '@/shared/layouts/TestLayout';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazyRoutes } from './routes';
import TestPage from '@/pages/TestPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout protectedRoutes />,
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
            element: <lazyRoutes.BlockPage />,
          },
          {
            path: 'onboarding',
            element: <lazyRoutes.OnboardingPage />,
          },
        ],
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
      { path: 'template', element: <lazyRoutes.TemplatePage /> },
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
          {
            path: 'password',
            element: <lazyRoutes.ResetPasswordPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/test',
    element: <TestLayout />,
    children: [
      {
        index: true,
        element: <TestPage />,
      },
    ],
  },
];

export const router = createBrowserRouter([...routes]);
