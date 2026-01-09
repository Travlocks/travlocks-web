import Cloud1Url from '@assets/backgrounds/cloud-1.svg?url';
import Cloud2Url from '@assets/backgrounds/cloud-2.svg?url';
import Cloud3Url from '@assets/backgrounds/cloud-3.svg?url';

const CLOUD_POS = {
  cloud1: 'left-[287px] top-[136px] z-10',
  cloud2: 'right-[328px] top-[177px] z-20',
  cloud3: 'left-[287px] bottom-[337px] z-30',
} as const;

const imgBase = 'absolute w-auto h-auto max-w-none select-none pointer-events-none';

const MainBg = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full bg-gradient-color-background">
        <img src={Cloud1Url} alt="" aria-hidden="true" className={`${imgBase} ${CLOUD_POS.cloud1}`} draggable={false} />
        <img src={Cloud2Url} alt="" aria-hidden="true" className={`${imgBase} ${CLOUD_POS.cloud2}`} draggable={false} />
        <img src={Cloud3Url} alt="" aria-hidden="true" className={`${imgBase} ${CLOUD_POS.cloud3}`} draggable={false} />
      </div>
    </div>
  );
};

export default MainBg;
