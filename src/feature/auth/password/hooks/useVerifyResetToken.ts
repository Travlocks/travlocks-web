import { useQuery } from '@tanstack/react-query';
import { getPasswordResetToken } from '../apis/passwordReset';
import type { VerifyTokenSuccessResponse } from '../types/passwordReset.types';

export const useVerifyResetToken = (token: string | null) => {
  return useQuery<VerifyTokenSuccessResponse, Error>({
    queryKey: ['verifyResetToken', token],
    queryFn: () => getPasswordResetToken(token!),
    enabled: !!token,
    retry: false,
  });
};
