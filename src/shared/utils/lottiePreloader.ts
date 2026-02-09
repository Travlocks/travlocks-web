let lottieCache: string | null = null;

export const preloadLottie = async () => {
  if (lottieCache) return lottieCache;

  try {
    const response = await fetch('/assets/exceptions/loading.lottie');
    const blob = await response.blob();
    lottieCache = URL.createObjectURL(blob);
    return lottieCache;
  } catch (error) {
    console.warn('Lottie preload failed:', error);
    return null;
  }
};

export const getLottieSrc = () => lottieCache;
