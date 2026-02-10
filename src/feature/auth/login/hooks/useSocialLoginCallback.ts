import { useMutation } from '@tanstack/react-query';
import { postGoogleLogin, postNaverLogin } from '../apis/socialLogin';
import { useAuth } from '@/shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import type {
  RequestGoogleLoginDto,
  RequestNaverLoginDto,
  SuccessGoogleLoginDto,
  SuccessNaverLoginDto,
  ErrorGoogleLoginDto,
  ErrorNaverLoginDto,
} from '../types/socialLogin.types';

// google 소셜 로그인 콜백
export const useGoogleLoginCallback = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation<SuccessGoogleLoginDto, AxiosError<ErrorGoogleLoginDto>, RequestGoogleLoginDto>({
    mutationFn: postGoogleLogin,
    onSuccess: (data) => {
      if (data.isSuccess && data.data) {
        const { accessToken, status } = data.data;

        // TODO: 온보딩 상태 처리는 나중에
        if (status === 'ONBOARDING') {
          login(accessToken);
          navigate('/', { replace: true });
          return;
        }

        login(accessToken);
        navigate('/', { replace: true });
      }
    },
    onError: (error) => {
      console.error('google 로그인 실패:', error.response?.data);
      navigate('/login', { replace: true });
    },
  });
};

// naver 소셜 로그인 콜백
export const useNaverLoginCallback = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation<SuccessNaverLoginDto, AxiosError<ErrorNaverLoginDto>, RequestNaverLoginDto>({
    mutationFn: postNaverLogin,
    onSuccess: (data) => {
      if (data.isSuccess && data.data) {
        const { accessToken, status } = data.data;

        // TODO: 온보딩 상태 처리는 나중에
        if (status === 'ONBOARDING') {
          login(accessToken);
          navigate('/', { replace: true });
          return;
        }

        login(accessToken);
        navigate('/', { replace: true });
      }
    },
    onError: (error) => {
      console.error('Naver 로그인 실패:', error.response?.data);
      navigate('/login', { replace: true });
    },
  });
};
