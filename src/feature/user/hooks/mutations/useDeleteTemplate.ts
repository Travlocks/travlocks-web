import { useMutation } from '@tanstack/react-query';
import { deleteTemplate } from '../../apis/delete';

function useDeleteTemplate() {
  return useMutation({
    mutationFn: deleteTemplate,
  });
}

export default useDeleteTemplate;
