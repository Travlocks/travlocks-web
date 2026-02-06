import { SESSION_STORAGE_KEY } from '@/shared/constants/key';
import { useState } from 'react';

export const useSplashState = () => {
  // sessionStorage에서 스플래시 상태 확인
  const getSplashStorage = () => {
    return sessionStorage.getItem(SESSION_STORAGE_KEY.showSplash);
  };
  const hasSeenSplash = getSplashStorage() === 'false';

  const [showSplash, setShowSplash] = useState(() => {
    return !hasSeenSplash;
  });

  // 스플래시 완료 시 상태 업데이트
  const handleSplashDone = () => {
    setShowSplash(false);
    sessionStorage.setItem(SESSION_STORAGE_KEY.showSplash, 'false');
  };

  // 스플래시 리셋 시 상태 업데이트
  const handleSplashReset = () => {
    setShowSplash(true);
    sessionStorage.removeItem(SESSION_STORAGE_KEY.showSplash);
  };

  return { showSplash, handleSplashDone, handleSplashReset, hasSeenSplash, setShowSplash };
};
