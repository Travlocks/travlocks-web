import { useMutation } from '@tanstack/react-query';
import { postLogout } from '../../apis/auth';

function usePostLogout() {
  return useMutation({
    mutationFn: postLogout,
  });
}

export default usePostLogout;
