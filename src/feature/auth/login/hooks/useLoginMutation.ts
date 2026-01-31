import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../apis/login';
import { useAuth } from '@/shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { RequestLoginDto, ResponseLoginDto } from '../login.type';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/shared/types/error';
import { handleLoginError } from '@/shared/utils/errorHandler';

interface useLoginMutationOptions {
  onSuccess?: (data: ResponseLoginDto) => void;
  onError?: (error: AxiosError<ErrorResponse>, errorMessage: string) => void;
}

export const useLoginMutation = (options?: useLoginMutationOptions) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation<ResponseLoginDto, AxiosError<ErrorResponse>, RequestLoginDto>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      if (data.isSuccess && data.data) {
        const { memberId, accessToken, accessTokenExpiresAt } = data.data;
        login(memberId, accessToken, Number(accessTokenExpiresAt));

        navigate('/');
      }

      // 추가 옵션 처리
      options?.onSuccess?.(data);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = handleLoginError(error);
      console.error(errorMessage);

      // 추가 옵션 처리
      options?.onError?.(error, errorMessage);
    },
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending };
};
