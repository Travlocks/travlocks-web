import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import logoLegacyUrl from '@assets/logo/logo-main-legacy.svg';

import { TravlocksWordmark } from './TravlocksWordmark';

const meta = {
  title: 'Shared/TravlocksWordmark',
  component: TravlocksWordmark,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TravlocksWordmark>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 로그인 카드와 동일: 높이 89px, max-width 373px */
const loginCardWordmarkClass = 'h-[89px] w-full';
const loginCardMaxWidth = 373;

function AssetComparePanel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full max-w-[400px] rounded-[30px] border border-[rgba(34,34,34,0.1)] bg-base-color-6 px-10 py-8 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-5px_rgba(0,0,0,0.1)]">
      <p className="h2 mb-1 text-center text-[18px] text-black">{title}</p>
      <p className="b2 mb-6 text-center text-base-color-1">{description}</p>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}

export const LogoFileLegacyVsCurrent: Story = {
  name: '로고 파일 비교 (legacy vs 현재)',
  render: () => (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-white px-4 py-12 lg:flex-row lg:items-start">
      <AssetComparePanel title="구 로고" description="logo-main-legacy.svg">
        <TravlocksWordmark
          src={logoLegacyUrl}
          alt="Travlocks (legacy)"
          className={loginCardWordmarkClass}
          style={{ maxWidth: loginCardMaxWidth }}
        />
      </AssetComparePanel>
      <AssetComparePanel title="현재 로고" description="logo-main.svg">
        <TravlocksWordmark className={loginCardWordmarkClass} style={{ maxWidth: loginCardMaxWidth }} />
      </AssetComparePanel>
    </div>
  ),
};
