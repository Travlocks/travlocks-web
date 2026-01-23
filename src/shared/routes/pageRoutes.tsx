import DefaultLayout from '@/shared/layouts/DefaultLayout';
import AuthLayout from '@/shared/layouts/auth/AuthLayout';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazyRoutes } from './routes';
import TestPage from '@/pages/TestPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <lazyRoutes.HomePage />,
      },
      {
        path: 'block',
        element: <lazyRoutes.BlockPage />,
      },
      {
        path: 'mypage',
        element: <lazyRoutes.MyPage />,
      },
      { path: 'template', element: <lazyRoutes.TemplatePage /> },
      { path: 'test', element: <TestPage /> },
    ],
  },
  {
    element: <DefaultLayout showNavbar={false} />,
    children: [
      {
        element: <AuthLayout />,
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
];

export const router = createBrowserRouter([...routes]);
