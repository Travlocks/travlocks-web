import type { TabType } from '../components/side/BlockTabs';
import { useDebouncedInputProps } from '@/shared/hooks/useDebouncedInput';

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
}

export function useBlockSearch({ activeTab: _activeTab, delay = 300 }: UseBlockSearchParams): UseBlockSearchReturn {
  const { inputProps, debouncedValue } = useDebouncedInputProps({
    delay,
    submit: () => {},
  });

  return {
    inputProps,
    debouncedValue,
  };
}
