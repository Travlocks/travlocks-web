import { useMutation } from '@tanstack/react-query';
import { postEmailVerificationResend } from '../../apis/auth';

function usePostEmailVerificationResend() {
  return useMutation({
    mutationFn: postEmailVerificationResend,
  });
}

export default usePostEmailVerificationResend;
