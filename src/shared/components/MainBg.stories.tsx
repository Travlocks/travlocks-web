import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';

import MainBg from './MainBg';

const meta = {
  title: 'Shared/MainBg',
  component: MainBg,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MainBg>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizeDecorator = (S: ComponentType) => (
  <div className="relative h-[480px] w-full overflow-hidden border border-base-color-3">
    <S />
  </div>
);

export const Home: Story = {
  parameters: { memoryRouter: { initialEntries: ['/'] } },
  decorators: [sizeDecorator],
};

export const LoginPage: Story = {
  args: { isFixed: false },
  parameters: { memoryRouter: { initialEntries: ['/login'] } },
  decorators: [sizeDecorator],
};
