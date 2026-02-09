import { TemplateCardStyle } from './styles/TemplateCard.styles';
import clsx from 'clsx';
import RemixIcon from '@/shared/assets/template/icon-remix.svg?react';
import SingleButton from '@/shared/components/Button/SingleButton';

const TemplateCardSkeleton = () => {
  return (
    <div className={TemplateCardStyle.wrapper(false)}>
      <div className={TemplateCardStyle.container(false)}>
        <div className={TemplateCardStyle.imageContainer}>
          <div className={clsx(TemplateCardStyle.image(false), 'bg-gradient-color-skeleton')} />
        </div>

        <div className={clsx(TemplateCardStyle.travelTheme(false), 'bg-base-color w-[70px] h-[30px]')} />

        <div className={TemplateCardStyle.content}>
          <div className={TemplateCardStyle.topSection}>
            <div className="bg-gradient-color-skeleton w-[246px] h-[24px] rounded-[6px]" />
            <div className="bg-gradient-color-skeleton w-[90px] h-[24px] rounded-[6px]" />
          </div>

          <div className={TemplateCardStyle.bottomSection}>
            <div className={TemplateCardStyle.metadata}>
              <div className="bg-gradient-color-skeleton w-[70px] h-[21px] rounded-[6px]" />
              <div className="bg-gradient-color-skeleton w-[170px] h-[21px] rounded-[6px]" />
            </div>

            <SingleButton
              text="리믹스 하기"
              width={387}
              height={45}
              textSize={18}
              variant="white"
              className={TemplateCardStyle.button(false)}
              icon={<RemixIcon className={TemplateCardStyle.buttonIcon} />}
              iconPosition="left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCardSkeleton;
