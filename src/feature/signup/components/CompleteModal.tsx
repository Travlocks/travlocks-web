import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { type DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';

import RoundButton from '@/shared/components/Button/RoundButton';
import MainBg from '@/shared/components/MainBg';

import { TravlocksWordmark } from '@/shared/components/TravlocksWordmark/TravlocksWordmark';
import SignupAnimation from '@feature/signup/assets/signup-animation.lottie';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { ResponseSignupDto } from '../types/auth';
import { SIGNUP_KEY } from '../constants/key';
import { STYLES } from '../data/styles';
import { THEMES } from '../data/preferencs';

const CompleteModal = () => {
  const navigate = useNavigate();
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null); // 로티 애니메이션 인스턴스
  const [isLottieDone, setIsLottieDone] = useState<boolean>(false); // 로티 에니메이션 종료 여부

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<ResponseSignupDto>(SIGNUP_KEY.signup);

  const themeIds = data?.data.preferredTravelThemes.map((t) => t.themeId);
  const styleIds = data?.data.preferredTravelStyles.map((s) => s.styleId);

  const USER = [
    { id: 1, label: 'TRAVELER', text: data?.data.nickname },
    {
      id: 2,
      label: 'INTERESTS',
      text: THEMES.filter((t) => themeIds?.includes(t.id))
        .map((t) => t.label)
        .join(','),
    },
    {
      id: 3,
      label: 'STYLE',
      text: STYLES.filter((s) => styleIds?.includes(s.id))
        .map((s) => s.label)
        .join(','),
    },
  ];

  useEffect(() => {
    const onComplete = () => {
      setIsLottieDone(true);
    };

    if (dotLottie) {
      dotLottie.addEventListener('complete', onComplete);
    }

    return () => {
      if (dotLottie) {
        dotLottie.removeEventListener('complete', onComplete);
      }
    };
  }, [dotLottie]);

  return (
    <div className="fixed inset-0 flex justify-center z-30 pt-8 overflow-y-auto">
      <MainBg isFixed={true} />

      <div className="max-w-[585px] w-full relative z-30 h-[1047px] animate-fade-in">
        <div className="bg-primary-color text-center py-[20px] text-[32px] font-bold leading-[38px] text-white rounded-t-[30px]">
          <h1>WELCOME ABOARD</h1>
        </div>

        <section className="bg-white flex flex-col gap-[20px] items-center pt-[41px] px-[43px] pb-[25px] border-x border-base-color">
          <div className="size-[242px] rounded-full overflow-hidden bg-[#F6FAFF]">
            <DotLottieReact
              src={SignupAnimation}
              loop={false}
              autoplay
              speed={1.5}
              dotLottieRefCallback={(dotLottie) => {
                setDotLottie(dotLottie);
              }}
            />
          </div>

          <h2 className="h4 leading-[20px]">
            환영합니다, <span className="text-primary-color">{data?.data.nickname}</span>님
          </h2>

          <p className="mt-[4px] text-center text-base-color-1 h9">
            트래블록스 가입이 완료되었습니다.
            <br />
            이제 블록을 쌓아 당신만의 여행을 조립해보세요.
          </p>

          <div className="mt-[20px] flex justify-between border-y border-base-color py-[20px] max-w-[399px] w-full">
            {USER.map((data) => (
              <div key={data.id} className="">
                <div className="flex flex-col gap-[8px]">
                  <p className="b7 text-base-color-1">{data.label}</p>
                  <p className="h9">{data.text}</p>
                </div>
              </div>
            ))}
          </div>

          <RoundButton text="여행 시작하기" className="mt-[40px]" onClick={() => navigate('/')} />

          <p className="mt-[6px] text-base-color-2 b4">설정은 언제든지 프로필에서 변경할 수 있습니다</p>
        </section>

        <div
          className={clsx(
            'relative h-[30px] bg-white',
            // 반지름 30px(지름 60)원을 잘라냄 (-> black은 보이고, transparent는 안 보이는 부분)
            '[mask-image:radial-gradient(circle_30px_at_left_center,transparent_99%,black_100%),radial-gradient(circle_30px_at_right_center,transparent_99%,black_100%)]',
            '[-webkit-mask-image:radial-gradient(circle_30px_at_left_bottom,transparent_99%,black_100%),radial-gradient(circle_30px_at_right_bottom,transparent_99%,black_100%)]',
            // 두 마스크 합치는 법 (-> black인 부분만 보이도록 합침)
            '[mask-composite:intersect]',
            '[-webkit-mask-composite:source-in]',
            // border
            'before:content-[""] before:absolute before:size-[62px] before:rounded-full before:border before:border-base-color before:left-[-31px] before:top-[-1px]',
            'after:content-[""] after:absolute after:size-[62px] after:rounded-full after:border after:border-base-color after:right-[-31px] after:top-[-1px]',
          )}>
          <hr className="border border-base-color border-dashed relative top-[20px] border-[5px]" />
        </div>

        {/* 잘릴 영역 */}
        {/* 로티 애니메이션 종료 후 재생됨 */}
        <div className={clsx('relative top-[-10px]', isLottieDone && 'animate-ticket-fall')}>
          <div
            className={clsx(
              'relative h-[30px] bg-white',
              '[mask-image:radial-gradient(circle_30px_at_left_top,transparent_99%,black_100%),radial-gradient(circle_30px_at_right_top,transparent_99%,black_100%)]',
              '[-webkit-mask-image:radial-gradient(circle_30px_at_left_top,transparent_99%,black_100%),radial-gradient(circle_30px_at_right_top,transparent_99%,black_100%)]',
              '[mask-composite:intersect]',
              '[-webkit-mask-composite:source-in]',
              'before:content-[""] before:absolute before:size-[62px] before:rounded-full before:border before:border-base-color before:left-[-31px] before:bottom-[-1px]',
              'after:content-[""] after:absolute after:size-[62px] after:rounded-full after:border after:border-base-color after:right-[-31px] after:bottom-[-1px]',
            )}>
            <hr className="border border-base-color border-dashed relative border-[5px]" />
          </div>

          <section className="pt-[14px] bg-white pb-[40px] flex flex-col gap-[28px] items-center rounded-b-[30px] border-b border-x border-base-color">
            <TravlocksWordmark className="max-w-[min(280px,90vw)]" />
            <p className="text-base-color-1 h9">조립하는 즐거움, 나만의 여행 블록 쌓기</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;
