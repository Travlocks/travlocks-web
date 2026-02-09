// 계정 탈퇴 훅
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type RequestAccountWithdrawalDto, type ResponseAccountWithdrawalDto } from '../types/account.types';
import { QUERY_KEY } from '@/shared/constants/key';
import { deleteAccount } from '../apis/account.api';

interface UseWithdrawalAccountOptions {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useWithdrawalAccount = (options?: UseWithdrawalAccountOptions) => {
  const queryClient = useQueryClient();
  const { mutate: withdrawalAccount, isPending } = useMutation<
    ResponseAccountWithdrawalDto,
    Error,
    RequestAccountWithdrawalDto
  >({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.member] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  return { withdrawalAccount, isPending };
};
