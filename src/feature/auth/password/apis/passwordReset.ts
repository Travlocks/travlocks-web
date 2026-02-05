export interface VerifyTokenResponse {
  isValid: boolean;
  isExpired?: boolean;
  message?: string;
}

/**
 * 비밀번호 재설정 토큰 유효성 검증
 * @param token - URL에서 받은 비밀번호 재설정 토큰
 * @returns 토큰 유효성 검증 결과
 */
export const verifyPasswordResetToken = async (token: string | null): Promise<VerifyTokenResponse> => {
  // TODO: 추후 실제 API로 대체
  if (!token) {
    return {
      isValid: false,
      message: '토큰이 없습니다.',
    };
  }

  // 임시 로직: 실제로는 API 호출로 대체
  // 여기서는 항상 유효한 것으로 가정 (추후 API 연동 시 수정)
  return {
    isValid: true,
  };
};
