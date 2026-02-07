import { QUERY_KEY } from '@/shared/constants/key';
import { useQuery } from '@tanstack/react-query';
import { getEmailExists } from '../apis/passwordReset';
import type { EmailExistsSuccessResponse } from '../types/emailExists';

export const useVerifyEmailExists = (email: string) => {
  return useQuery<EmailExistsSuccessResponse, Error>({
    queryKey: [QUERY_KEY.emailExists, email],
    queryFn: () => getEmailExists(email),
    enabled: !!email,
    retry: false,
  });
};
