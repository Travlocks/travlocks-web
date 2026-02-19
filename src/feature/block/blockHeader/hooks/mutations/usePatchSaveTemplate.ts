import { useMutation } from '@tanstack/react-query';
import { patchSaveTemplate } from '../../api/template';
import type { RequestSaveTemplateDto } from '../../types/template';

interface RequestProps {
  templateId: number;
  body: RequestSaveTemplateDto;
}

function usePatchSaveTemplate() {
  return useMutation({
    mutationFn: ({ templateId, body }: RequestProps) => patchSaveTemplate(templateId, body),
  });
}

export default usePatchSaveTemplate;
