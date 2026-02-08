import { useQuery } from '@tanstack/react-query';
import { getPasswordResetToken } from '../apis/passwordReset';
import type { VerifyTokenSuccessResponse } from '../types/passwordReset.types';
import { QUERY_KEY } from '@/shared/constants/key';

export const useVerifyResetToken = (token: string | null) => {
  return useQuery<VerifyTokenSuccessResponse, Error>({
    queryKey: [QUERY_KEY.verifyResetToken, token],
    queryFn: () => getPasswordResetToken(token!),
    enabled: !!token,
    retry: false,
  });
};
