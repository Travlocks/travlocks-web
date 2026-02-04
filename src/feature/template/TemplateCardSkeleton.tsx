import { templateCardStyles } from './styles/TemplateCard.styles';
import clsx from 'clsx';
import RemixIcon from '@/shared/assets/template/icon-remix.svg?react';

const TemplateCardSkeleton = () => {
  return (
    <div className={templateCardStyles.wrapper(false)}>
      <div className={templateCardStyles.container(false)}>
        <div className={templateCardStyles.imageContainer}>
          <div className={clsx(templateCardStyles.image(false), 'bg-gradient-color-skeleton')} />
        </div>

        <div className={clsx(templateCardStyles.travelTheme(false), 'bg-base-color w-[70px] h-[30px]')} />

        <div className={templateCardStyles.content}>
          <div className={templateCardStyles.topSection}>
            <div className="bg-gradient-color-skeleton w-[246px] h-[24px] rounded-[6px]" />
            <div className="bg-gradient-color-skeleton w-[90px] h-[24px] rounded-[6px]" />
          </div>

          <div className={templateCardStyles.bottomSection}>
            <div className={templateCardStyles.metadata}>
              <div className="bg-gradient-color-skeleton w-[70px] h-[21px] rounded-[6px]" />
              <div className="bg-gradient-color-skeleton w-[170px] h-[21px] rounded-[6px]" />
            </div>

            <button className={templateCardStyles.button(false)}>
              <span className={templateCardStyles.buttonIcon}>
                <RemixIcon />
              </span>
              리믹스 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCardSkeleton;
