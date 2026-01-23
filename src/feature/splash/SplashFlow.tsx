import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SplashIntro from './SplashIntro';
import SplashExit from './SplashExit';

interface SplashFlowProps {
  onDone: () => void;
}

type Step = 'intro' | 'exit';

// 스플래시 플로우 컴포넌트
const SplashFlow = ({ onDone }: SplashFlowProps) => {
  const [step, setStep] = useState<Step>('intro');

  return (
    <div className="absolute inset-0 z-modal">
      <AnimatePresence mode="wait">
        {step === 'intro' ? (
          <SplashIntro key="intro" onNext={() => setStep('exit')} />
        ) : (
          <SplashExit key="exit" onDone={onDone} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashFlow;
