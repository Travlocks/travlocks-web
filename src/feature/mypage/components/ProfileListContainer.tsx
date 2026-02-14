import type { ReactNode } from 'react';

interface ProfileListContainerProps {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
}

const ProfileListContainer = ({ title, description, action, children }: ProfileListContainerProps) => {
  return (
    <section>
      <div className="flex items-center justify-between gap-5">
        <div>
          <h2 className="text-[36px] font-semibold leading-none text-base-color-0">{title}</h2>
          <p className="mt-3 text-2xl font-normal leading-none text-base-color-1">{description}</p>
        </div>
        {action}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
};

export default ProfileListContainer;
