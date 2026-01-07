import HomeLayout from '@layouts/HomeLayout';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazyRoutes } from './routes';
import TestPage from '@/pages/TestPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
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
        path: 'login',
        element: <lazyRoutes.LoginPage />,
      },
      {
        path: 'mypage',
        element: <lazyRoutes.MyPage />,
      },
      {
        path: 'password',
        element: <lazyRoutes.ResetPasswordPage />,
      },
      { path: 'signup', element: <lazyRoutes.SignupPage /> },
      { path: 'template', element: <lazyRoutes.TemplatePage /> },
      { path: 'test', element: <TestPage /> },
    ],
  },
];

export const router = createBrowserRouter([...routes]);
