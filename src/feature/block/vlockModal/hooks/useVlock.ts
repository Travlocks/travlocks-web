import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/key';
import { createVlock, updateVlock, deleteVlock } from '../apis/vlock.api';
import type {
  CreateVlockModalRequestDto,
  UpdateVlockModalRequestDto,
  CreateVlockModalResponseDto,
  UpdateVlockModalResponseDto,
  DeleteVlockModalResponseDto,
} from '../types/vlockModal.types';

/**
 * Vlock 생성 Hook
 */
export const useCreateVlock = (): UseMutationResult<
  CreateVlockModalResponseDto,
  Error,
  { request: CreateVlockModalRequestDto; coverImg?: File | null }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ request, coverImg }) => createVlock(request, coverImg),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY.createdVlocks] });
    },
  });
};

/**
 * Vlock 수정 Hook
 */
export const useUpdateVlock = (): UseMutationResult<
  UpdateVlockModalResponseDto,
  Error,
  { vlockId: number; request: UpdateVlockModalRequestDto; coverImg?: File | null }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ vlockId, request, coverImg }) => updateVlock(vlockId, request, coverImg),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY.createdVlocks] });
    },
  });
};

/**
 * Vlock 삭제 Hook
 */
export const useDeleteVlock = (): UseMutationResult<DeleteVlockModalResponseDto, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vlockId: number) => deleteVlock(vlockId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY.createdVlocks] });
    },
  });
};
