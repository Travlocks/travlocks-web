import { useMutation } from '@tanstack/react-query';
import { postEmailVerificationConfirm } from '../../apis/auth';

function usePostEmailVerificationConfirm() {
  return useMutation({
    mutationFn: postEmailVerificationConfirm,
  });
}

export default usePostEmailVerificationConfirm;
