import PlaneIcon from '@/shared/assets/vlockCRUD/plane.svg?react';
import ParabolaIcon from '@/shared/assets/vlockCRUD/parabola.svg?react';
import Cloud1Icon from '@/shared/assets/vlockCRUD/cloud_1.svg?react';
import Cloud2Icon from '@/shared/assets/vlockCRUD/cloud_2.svg?react';
import Cloud3Icon from '@/shared/assets/vlockCRUD/cloud_3.svg?react';

/**
 * Vlock 생성/편집 시 이미지가 없을 때 표시되는 기본 이미지 컴포넌트입니다.
 * 구름, 궤적 아이콘을 포함한 그래디언트 배경의 디자인을 제공합니다.
 */
const DefaultVlockImage = () => {
    return (
        <div className="w-full h-full bg-gradient-color-background relative overflow-hidden">
            {/* 가이드 궤적 (포물선) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-60">
                <ParabolaIcon className="w-full h-full scale-125 translate-x-10" />
            </div>

            {/* 구름 배치 */}
            <div className="absolute top-[24px] left-[20%]">
                <Cloud1Icon className="w-[43px] h-[25px] opacity-80" />
            </div>
            <div className="absolute top-[48px] right-[15%]">
                <Cloud2Icon className="w-[68px] h-[40px] opacity-90" />
            </div>
            <div className="absolute bottom-[24px] left-[12%]">
                <Cloud3Icon className="w-[58px] h-[34px] opacity-70" />
            </div>
            <div className="absolute bottom-[30%] right-[8%]">
                <Cloud1Icon className="w-[50px] h-[29px] opacity-60" />
            </div>

            {/* 비행기 */}
            {/* <div className="absolute top-[40%] left-[22%] -translate-y-1/2">
                <PlaneIcon className="w-[110px] h-[110px] drop-shadow-[0_10px_10px_rgba(60,78,244,0.15)]" />
            </div> */}
        </div>
    );
};

export default DefaultVlockImage;
