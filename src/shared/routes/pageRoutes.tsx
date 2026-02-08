import DefaultLayout from '@/shared/layouts/DefaultLayout';
import AuthLayout from '@/shared/layouts/auth/AuthLayout';
import TestLayout from '@/shared/layouts/TestLayout';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazyRoutes } from './routes';
import TestPage from '@/pages/TestPage';
import NotFoundPage from '@/shared/components/Exception/NotFoundPage';

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
        element: <lazyRoutes.MyPage />,
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
