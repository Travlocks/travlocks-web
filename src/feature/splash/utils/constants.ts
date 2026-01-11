// 스플래시 뷰박스 좌표
export const SPLASH_VIEWBOX = '0 0 1950 480';
// 스플래시 뷰박스 비율
export const SPLASH_PRESERVE_ASPECT_RATIO = 'xMidYMid meet';
// 스플래시 비행기 이동 경로
export const SPLASH_VIEWBOX_D = 'M-24 508.842C76 420.254 952.5 -207.246 1954.5 71.2543';
// 스플래시 비행기 너비
export const PLANE_W = 170;
// 스플래시 비행기 높이
export const PLANE_H = 132;

// 스플래시 인트로 애니메이션 설정
export const SPLASH_INTRO_ANIMATION = {
  // 인트로 진입 애니메이션 시간(초)
  duration: 2,
  // 인트로 종료 애니메이션 시간(초)
  exitDuration: 1,
  // 애니메이션 이징 함수
  ease: 'linear' as const,
  // 애니메이션 타입
  type: 'tween' as const,
} as const;

// 스플래시 종료 애니메이션 설정
export const SPLASH_EXIT_ANIMATION = {
  // 비행기 이동 애니메이션 시간(초)
  duration: 1.7,
  // 애니메이션 함수 타입
  ease: 'linear' as const,
} as const;
