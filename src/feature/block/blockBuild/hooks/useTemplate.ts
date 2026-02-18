import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { updateTemplate } from '../apis/templateBlockApi';
import type { UpdateTemplateRequestDto, UpdateTemplateResponseDto } from '../blockBuild.type';

/**
 * 템플릿 수정 Hook
 */
export const useUpdateTemplate = (): UseMutationResult<
  UpdateTemplateResponseDto,
  Error,
  { templateId: number; request: UpdateTemplateRequestDto; coverImage?: File | null }
> => {
  return useMutation({
    mutationFn: ({ templateId, request, coverImage }) => updateTemplate(templateId, request, coverImage),
  });
};
