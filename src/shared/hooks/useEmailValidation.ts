import { useFormContext } from 'react-hook-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useVerifyEmail } from '@/feature/auth/password/hooks/useVerifyEmailExists';

type EmailValidationMode = 'signup' | 'reset';

interface UseEmailValidationOptions {
  mode?: EmailValidationMode;
  fieldName?: string;
}

interface UseEmailValidationWithValuesOptions {
  mode?: EmailValidationMode;
  email: string;
  emailOk: boolean;
}

function useEmailExists(trimmedEmail: string, emailOk: boolean, mode: EmailValidationMode) {
  const hasEmail = trimmedEmail.length > 0;
  const isValidEmail = emailOk && hasEmail;

  const [debouncedEmail, setDebouncedEmail] = useState('');
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 유효하지 않은 이메일 주소인 경우 디바운스 초기화
    if (!isValidEmail) {
      debounceTimerRef.current = window.setTimeout(() => {
        setDebouncedEmail('');
      }, 0);
      return;
    }

    // 유효한 이메일 주소인 경우 디바운스
    debounceTimerRef.current = window.setTimeout(() => {
      setDebouncedEmail(trimmedEmail);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [trimmedEmail, isValidEmail]);

  const { data: emailExistsData, error: emailExistsError, isLoading: isCheckingEmail } = useVerifyEmail(debouncedEmail);

  // 이메일 존재 여부 메시지
  const emailExistsMessage = useMemo(() => {
    if (!isValidEmail || isCheckingEmail || debouncedEmail !== trimmedEmail) {
      return null;
    }

    if (emailExistsError) {
      return '일시적인 오류가 발생했습니다. 다시 시도해주세요.';
    }

    if (emailExistsData) {
      if (mode === 'signup') {
        if (emailExistsData.data.exists === true) {
          return '이미 가입된 이메일입니다.';
        }
        // mode === 'reset'
      } else {
        if (emailExistsData.data.exists === false) {
          return '가입되지 않은 이메일 주소입니다.';
        }
      }
    }

    return null;
  }, [emailExistsData, emailExistsError, isValidEmail, isCheckingEmail, mode, debouncedEmail, trimmedEmail]);

  const canProceed = useMemo(() => {
    if (!hasEmail || !emailOk || isCheckingEmail || emailExistsError || debouncedEmail !== trimmedEmail) {
      return false;
    }

    if (!emailExistsData) return false;

    if (mode === 'signup') {
      return emailExistsData.data.exists === false;
    } else {
      return emailExistsData.data.exists === true;
    }
  }, [hasEmail, emailOk, isCheckingEmail, emailExistsError, debouncedEmail, trimmedEmail, mode, emailExistsData]);

  return {
    emailExistsMessage,
    isCheckingEmail,
    canProceed,
  };
}

// signup 모드 사용 훅
export function useEmailValidation(options?: UseEmailValidationOptions) {
  const mode = options?.mode ?? 'reset';
  const fieldName = options?.fieldName ?? 'email';

  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const email = (watch(fieldName) ?? '') as string;
  const trimmedEmail = email.trim();
  const emailOk = !errors[fieldName];

  return useEmailExists(trimmedEmail, emailOk, mode);
}

export function useEmailValidationWithValues(options: UseEmailValidationWithValuesOptions) {
  const mode = options.mode ?? 'reset';
  const trimmedEmail = options.email.trim();

  return useEmailExists(trimmedEmail, options.emailOk, mode);
}
