import type { AxiosError } from 'axios';
import type { ErrorLoginDto } from '@/feature/auth/login/types/login.types';
import type { ErrorNaverLoginDto } from '@/feature/auth/login/types/socialLogin.types';
import type { ErrorGoogleLoginDto } from '@/feature/auth/login/types/socialLogin.types';

// 로그인 에러 처리
export const handleLoginError = (
  error: AxiosError<ErrorLoginDto | ErrorNaverLoginDto | ErrorGoogleLoginDto> | Error,
) => {
  if (!('response' in error)) {
    return error.message || '로그인 중 오류가 발생했습니다.';
  }

  const status = error.response?.status;
  const errorCode = error.response?.data?.errorCode;
  const message = error.response?.data?.errorMessage;

  if (errorCode === 'EMAIL_ALREADY_EXISTS') {
    return message || '이미 사용중인 이메일입니다.';
  }

  switch (status) {
    case 400:
      return message || '잘못된 요청입니다. 입력 정보를 확인해주세요.';
    case 401:
      if (message?.includes('비밀번호') || message?.includes('password')) {
        return '비밀번호가 일치하지 않습니다.';
      }
      if (message?.includes('유저를 찾을') || message?.includes('사용자를 찾을')) {
        return '유저를 찾을 수 없습니다.';
      }
      return message || '이메일 또는 비밀번호가 올바르지 않습니다.';
    case 404:
      return message || '가입되어 있는 이메일이 아닙니다.';
    case 409:
      return message || '해당 이메일로 가입된 일반 계정이 이미 존재합니다.';
    case 500:
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return message || '로그인 중 오류가 발생했습니다.';
  }
};
