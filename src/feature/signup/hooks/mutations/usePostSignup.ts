import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { postSignup } from '../../apis/auth';
import type { RequestSignupDto, ResponseSignupDto } from '../../types/auth';

function usePostSignup(options?: UseMutationOptions<ResponseSignupDto, Error, RequestSignupDto>) {
  return useMutation({
    mutationFn: postSignup,
    ...options,
  });
}

export default usePostSignup;
