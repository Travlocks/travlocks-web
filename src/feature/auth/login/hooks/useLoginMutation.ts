import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../apis/login';
import { useAuth } from '@/shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { ResponseLoginDto } from '../login.type';
import type { AxiosError } from 'axios';

interface useLoginMutationOptions {
  onSuccess?: (data: ResponseLoginDto) => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
}

export const useLoginMutation = (options?: useLoginMutationOptions) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      if (data.isSuccess && data.data) {
        const { memberId, accessToken } = data.data;
        login(memberId, accessToken);

        navigate('/');
      }

      // 추가 옵션 처리
      options?.onSuccess?.(data);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error(error);

      // 추가 옵션 처리
      options?.onError?.(error);
    },
  });
  return { loginMutation, isPending };
};
