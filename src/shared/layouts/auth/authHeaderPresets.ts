import type { AuthLayoutHeader } from './AuthLayout.type';

const DEFAULT_AUTH_HEADER: AuthLayoutHeader = {
  description: '조립하는 즐거움, 나만의 여행 블록 쌓기',
  showAuthNav: true,
  buttonText: '',
} satisfies AuthLayoutHeader;

// 인증 헤더 미리 정의
export const AUTH_HEADER = {
  login: {
    ...DEFAULT_AUTH_HEADER,
    buttonText: 'Vlock 쌓으러 가기',
  },
  signup: {
    ...DEFAULT_AUTH_HEADER,
    buttonText: '여행 시작하기',
  },

  password: {
    request: {
      subtitle: '비밀번호를 잊으셨나요?',
      description: '가입한 이메일 주소를 입력해주세요.\n비밀번호 재설정 링크를 보내드립니다.',
      showAuthNav: false,
    } satisfies AuthLayoutHeader,
    sent: {
      subtitle: '비밀번호 재설정 메일 발송 완료',
      description: '재설정 링크가 포함된 메일이 발송되었습니다.\n메일함을 확인해주세요.',
      showAuthNav: false,
      buttonText: '로그인 화면으로',
    } satisfies AuthLayoutHeader,
  },
} as const;
