import DefaultLayout from '@/shared/layouts/DefaultLayout';
import AuthLayout from '@/shared/layouts/AuthLayout';
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
        element: <AuthLayout description="조립하는 즐거움, 나만의 여행 블록 쌓기" showAuthNav={true} />,
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
        element: (
          <AuthLayout
            subtitle={'비밀번호를 잊으셨나요?'}
            description={'가입한 이메일 주소를 입력해주세요.\n비밀번호 재설정 링크를 보내드립니다.'}
            showAuthNav={false}
          />
        ),
        children: [
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
