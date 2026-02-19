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
import { handleLoginError } from '@/shared/utils/errorHandler';

interface useSocialLoginCallbackOptions {
  onSuccess?: (data: SuccessGoogleLoginDto | SuccessNaverLoginDto) => void;
  onError?: (error: AxiosError<ErrorGoogleLoginDto | ErrorNaverLoginDto>, errorMessage: string) => void;
}

// google 소셜 로그인 콜백
export const useGoogleLoginCallback = (options?: useSocialLoginCallbackOptions) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation<SuccessGoogleLoginDto, AxiosError<ErrorGoogleLoginDto>, RequestGoogleLoginDto>({
    mutationFn: postGoogleLogin,
    onSuccess: (data) => {
      if (data.isSuccess && data.data) {
        const { accessToken, status } = data.data;

        if (status === 'ONBOARDING') {
          login(accessToken);
          navigate('/onboarding', { replace: true });
          return;
        }

        login(accessToken);
        navigate('/', { replace: true });
      }
      options?.onSuccess?.(data);
    },
    onError: (error: AxiosError<ErrorGoogleLoginDto>) => {
      const errorMessage = handleLoginError(error);
      console.error(errorMessage);
      options?.onError?.(error, errorMessage);
    },
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending };
};

// naver 소셜 로그인 콜백
export const useNaverLoginCallback = (options?: useSocialLoginCallbackOptions) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation<SuccessNaverLoginDto, AxiosError<ErrorNaverLoginDto>, RequestNaverLoginDto>({
    mutationFn: postNaverLogin,
    onSuccess: (data) => {
      if (data.isSuccess && data.data) {
        const { accessToken, status } = data.data;

        if (status === 'ONBOARDING') {
          login(accessToken);
          navigate('/onboarding', { replace: true });
          return;
        }

        login(accessToken);
        navigate('/', { replace: true });
      }
      options?.onSuccess?.(data);
    },
    onError: (error: AxiosError<ErrorNaverLoginDto>) => {
      const errorMessage = handleLoginError(error);
      console.error(errorMessage);
      options?.onError?.(error, errorMessage);
    },
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending };
};
