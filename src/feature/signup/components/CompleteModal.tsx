import { useNavigate } from 'react-router-dom';

import RoundButton from '@/shared/components/Button/RoundButton';
import MainBg from '@/shared/components/MainBg';

import Logo from '@assets/logo/logo-auth.svg?react';
import clsx from 'clsx';

const USER = [
  { id: 1, label: 'TRAVELER', text: '윤디모' },
  { id: 1, label: 'INTERESTS', text: '자연, 맛집' },
  { id: 1, label: 'STYLE', text: '효율중시형' },
];

const CompleteModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex justify-center z-30 py-8 overflow-y-auto">
      <MainBg isFixed={true} />

      <div className="max-w-[585px] w-full relative z-30 h-[1047px] animate-fade-in">
        <div className="bg-primary-color text-center py-[20px] text-[32px] font-bold leading-[38px] text-white rounded-t-[30px]">
          <h1>WELCOME ABOARD</h1>
        </div>

        <section className="bg-white flex flex-col gap-[20px] items-center pt-[41px] px-[43px] pb-[25px] border-x border-base-color">
          <div className="size-[242px] rounded-full overflow-hidden bg-[#F6FAFF]">
            <img />
          </div>

          <h2 className="h4 leading-[20px]">
            환영합니다, <span className="text-primary-color">윤디모</span>님
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
            'relative h-[60px] bg-white overflow-visible z-10',
            // 반지름 30px(지름 60)원을 잘라냄 (-> black은 보이고, transparent는 안 보이는 부분)
            '[mask-image:radial-gradient(circle_30px_at_left_center,transparent_99%,black_100%),radial-gradient(circle_30px_at_right_center,transparent_99%,black_100%)]',
            '[-webkit-mask-image:radial-gradient(circle_30px_at_left_center,transparent_99%,black_100%),radial-gradient(circle_30px_at_right_center,transparent_99%,black_100%)]',
            // 두 마스크 합치는 법 (-> black인 부분만 보이도록 합침)
            '[mask-composite:intersect]',
            '[-webkit-mask-composite:destination-in]',
            // border
            'before:content-[""] before:absolute before:size-[62px] before:rounded-full before:border before:border-base-color before:left-[-31px] before:top-[-1px]',
            'after:content-[""] after:absolute after:size-[62px] after:rounded-full after:border after:border-base-color after:right-[-31px] after:top-[-1px]',
          )}>
          <hr className="border border-base-color border-dashed relative top-[30px] border-[5px]" />
        </div>

        <section className="pt-[14px] bg-white pb-[40px] flex flex-col gap-[28px] items-center rounded-b-[30px] border-b border-x border-base-color">
          <Logo />
          <p className="text-base-color-1 h9">조립하는 즐거움, 나만의 여행 블록 쌓기</p>
        </section>
      </div>
    </div>
  );
};

export default CompleteModal;
