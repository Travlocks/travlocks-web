import { useMutation } from '@tanstack/react-query';
import { postTemplatesPreInputs } from '../apis/onboarding';
import type { OnboardingRequestDto, OnboardingResponseDto } from '../types/onboarding.type';

/**
 * 특정 템플릿의 캐시 키를 생성합니다.
 * @param templateId 서버에서 발급받은 템플릿 ID
 */
export const getTemplateCacheKey = (templateId: string) => `template_cache_${templateId}`;

export const usePostOnboarding = () => {
  return useMutation<OnboardingResponseDto, Error, OnboardingRequestDto>({
    mutationFn: postTemplatesPreInputs,
    onSuccess: (data) => {
      const { templateId } = data;
      const cacheKey = getTemplateCacheKey(templateId);

      // 현재는 preInputs 정보만 저장하지만,
      // 나중에 이 객체에 다른 API의 결과를 점진적으로 병합(Merge)할 수 있는 구조입니다.
      const templateCache = {
        preInputs: data,
      };

      sessionStorage.setItem(cacheKey, JSON.stringify(templateCache));

      console.log(`[Cache Success] Template ID: ${templateId}`, templateCache);
    },
    onError: (error) => {
      console.error('여행 사전 정보 설정 실패:', error.message);
    },
  });
};
