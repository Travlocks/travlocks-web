import { useMutation } from '@tanstack/react-query';
import { postEmailVerificationDto } from '../../apis/auth';

function usePostEmailVerification() {
  return useMutation({
    mutationFn: postEmailVerificationDto,
  });
}

export default usePostEmailVerification;
