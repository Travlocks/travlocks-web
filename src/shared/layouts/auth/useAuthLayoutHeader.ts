import { useOutletContext } from 'react-router-dom';
import type { AuthLayoutOutletCtx } from './AuthLayout.type';

/**
 * 인증 관련 페이지 컨텍스트를 사용하는 훅
 *
 * @description
 * 인증 관련 페이지 컨텍스트를 반환하는 훅입니다.
 *
 * @author seomgin36
 */

export function useAuthLayoutHeader() {
  const ctx = useOutletContext<AuthLayoutOutletCtx>();
  return ctx;
}
