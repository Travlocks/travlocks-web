import type { AxiosError } from 'axios';
import type { ErrorLoginDto } from '@/feature/auth/login/login.type';

// 로그인 에러 처리
export const handleLoginError = (error: AxiosError<ErrorLoginDto>) => {
  const status = error.response?.status;
  const message = error.response?.data?.errorMessage;

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
      return message || '요청한 리소스를 찾을 수 없습니다.';
    case 500:
      return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return message || '로그인 중 오류가 발생했습니다.';
  }
};
