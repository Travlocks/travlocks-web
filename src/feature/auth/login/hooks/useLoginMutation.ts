import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../apis/login';
import { useAuth } from '@/shared/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();

  // 진입 경로. 없으면 홈으로
  const from = (location.state as { from?: string })?.from || '/';

  const mutation = useMutation<ResponseLoginDto, AxiosError<ErrorResponse>, RequestLoginDto>({
    mutationFn: postLogin,
    onSuccess: (data) => {
      if (data.isSuccess && data.data) {
        const { accessToken } = data.data;
        login(accessToken);

        // 진입 경로로 이동
        navigate(from, { replace: true });
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
