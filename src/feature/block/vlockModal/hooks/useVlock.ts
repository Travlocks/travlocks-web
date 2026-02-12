import { useMutation, type UseMutationResult } from '@tanstack/react-query';
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
  return useMutation({
    mutationFn: ({ request, coverImg }) => createVlock(request, coverImg),
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
  return useMutation({
    mutationFn: ({ vlockId, request, coverImg }) => updateVlock(vlockId, request, coverImg),
  });
};

/**
 * Vlock 삭제 Hook
 */
export const useDeleteVlock = (): UseMutationResult<DeleteVlockModalResponseDto, Error, number> => {
  return useMutation({
    mutationFn: (vlockId: number) => deleteVlock(vlockId),
  });
};
