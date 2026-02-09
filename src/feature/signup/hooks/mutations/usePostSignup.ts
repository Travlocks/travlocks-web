import { useMutation } from '@tanstack/react-query';
import { postSignup } from '../../apis/auth';

function usePostSignup() {
  return useMutation({
    mutationFn: postSignup,
  });
}

export default usePostSignup;
