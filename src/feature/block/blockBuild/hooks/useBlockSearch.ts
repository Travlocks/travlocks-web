import type { TabType } from '../components/side/BlockTabs';
import { useDebouncedInputProps } from '@/shared/hooks/useDebouncedInput';

// TODO: API 연동 시 수정
export interface TabSearchConfig {
  endpoint: string;
  params?: Record<string, string | number>;
}

// TODO: API 연동 시 수정
export const TAB_SEARCH_CONFIG: Record<TabType, TabSearchConfig> = {
  인기: {
    endpoint: '/vlocks/cities/{cityId}/popular',
    params: { sort: 'popular' },
  },
  카테고리: {
    endpoint: '/vlocks/cities/{cityId}/categories/{categoryId}',
    params: { sort: 'category' },
  },
  생성: {
    endpoint: '/vlocks/cities/{cityId}',
  },
};

interface UseBlockSearchParams {
  activeTab: TabType;
  delay?: number;
}

interface UseBlockSearchReturn {
  inputProps: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  debouncedValue: string;
  currentConfig: TabSearchConfig;
}

export function useBlockSearch({ activeTab, delay = 300 }: UseBlockSearchParams): UseBlockSearchReturn {
  const { inputProps, debouncedValue } = useDebouncedInputProps({
    delay,
    submit: () => {
      console.log('submit');
    },
  });

  const currentConfig = TAB_SEARCH_CONFIG[activeTab];

  return {
    inputProps,
    debouncedValue,
    currentConfig,
  };
}
