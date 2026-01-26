import Cloud1Url from '@assets/backgrounds/cloud-1.svg?url';
import Cloud2Url from '@assets/backgrounds/cloud-2.svg?url';
import Cloud3Url from '@assets/backgrounds/cloud-3.svg?url';
import AuthBgLineUrl from '@assets/backgrounds/auth-bg-line.svg?url';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

interface MainBgProps {
  isFixed?: boolean;
}

const CLOUD_POS = {
  cloud1: 'left-[287px] top-[136px] z-30',
  cloud2: 'right-[328px] top-[177px] z-30',
  cloud3: 'left-[287px] bottom-[337px] z-30',
} as const;

const imgBase = 'absolute w-auto h-auto max-w-none select-none pointer-events-none';

const AUTH_PAGES = ['/login', '/signup', '/password'];
const MainBg = ({ isFixed }: MainBgProps) => {
  const location = useLocation();

  const isAuthPage = AUTH_PAGES.includes(location.pathname);

  return (
    <div className={clsx(isFixed ? 'fixed' : 'absolute', 'inset-0 z-0 overflow-hidden pointer-events-none')}>
      <div className="relative w-full h-full bg-gradient-color-background">
        {isAuthPage && (
          <img
            src={AuthBgLineUrl}
            alt=""
            aria-hidden="true"
            className="absolute left-0 bottom-[180px] w-full h-full z-10"
            draggable={false}
          />
        )}
        <img src={Cloud1Url} alt="" aria-hidden="true" className={`${imgBase} ${CLOUD_POS.cloud1}`} draggable={false} />
        <img src={Cloud2Url} alt="" aria-hidden="true" className={`${imgBase} ${CLOUD_POS.cloud2}`} draggable={false} />
        <img src={Cloud3Url} alt="" aria-hidden="true" className={`${imgBase} ${CLOUD_POS.cloud3}`} draggable={false} />
      </div>
    </div>
  );
};

export default MainBg;
