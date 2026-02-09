import loadingAnimation from '@assets/exceptions/loading.lottie';

let lottieCache: string | null = null;

export const preloadLottie = async () => {
  if (lottieCache) return lottieCache;

  try {
    const response = await fetch(loadingAnimation);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    const blob = await response.blob();
    lottieCache = URL.createObjectURL(blob);
    return lottieCache;
  } catch (error) {
    console.warn('Lottie preload failed:', error);
    return null;
  }
};

export const getLottieSrc = () => lottieCache;
