import DefaultLayout from '@/shared/layouts/DefaultLayout';
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
      {
        path: 'password',
        element: <lazyRoutes.ResetPasswordPage />,
      },
      { path: 'template', element: <lazyRoutes.TemplatePage /> },
      { path: 'test', element: <TestPage /> },
    ],
  },
  {
    path: '/login',
    element: <DefaultLayout showNavbar={false} />,
    children: [
      {
        index: true,
        element: <lazyRoutes.LoginPage />,
      },
    ],
  },
  {
    path: '/signup',
    element: <DefaultLayout showNavbar={false} />,
    children: [{ index: true, element: <lazyRoutes.SignupPage /> }],
  },
];

export const router = createBrowserRouter([...routes]);
