import type { Meta, StoryObj } from '@storybook/react-vite';

import { withMemoryRouter } from '../../../.storybook/decorators';
import MainBg from './MainBg';

const meta = {
  title: 'Shared/MainBg',
  component: MainBg,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MainBg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  decorators: [
    withMemoryRouter('/'),
    (S) => (
      <div className="relative h-[480px] w-full overflow-hidden border border-base-color-3">
        <S />
      </div>
    ),
  ],
};

export const LoginPage: Story = {
  args: { isFixed: false },
  decorators: [
    withMemoryRouter('/login'),
    (S) => (
      <div className="relative h-[480px] w-full overflow-hidden border border-base-color-3">
        <S />
      </div>
    ),
  ],
};
