import { useMutation } from '@tanstack/react-query';
import { postTemplateRemix } from '../../apis/template';

function usePostTemplateRemix() {
  return useMutation({
    mutationFn: postTemplateRemix,
  });
}

export default usePostTemplateRemix;
