import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import RoundButton from './RoundButton';

const meta = {
  title: 'Shared/RoundButton',
  component: RoundButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onClick: fn() },
  argTypes: {
    hover: { control: 'boolean' },
    isAnimated: { control: 'boolean' },
    arrowLeft: { control: 'boolean' },
  },
} satisfies Meta<typeof RoundButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '여행 조립하러 떠나기',
    width: 292,
  },
};

export const WithHoverGradient: Story = {
  args: {
    text: '여행 시작하기',
    width: 292,
    hover: true,
  },
};

export const AnimatedArrow: Story = {
  args: {
    text: '다음 단계',
    width: 320,
    isAnimated: true,
  },
};

export const ArrowLeft: Story = {
  args: {
    text: '뒤로',
    width: 280,
    arrowLeft: true,
  },
};
