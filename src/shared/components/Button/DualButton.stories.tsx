import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import DualButton from './DualButton';

const meta = {
  title: 'Shared/DualButton',
  component: DualButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DualButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 215,
    height: 64,
    gap: 10,
    textSize: 20,
    left: { text: '이전', variant: 'white', onClick: fn() },
    right: { text: '다음', variant: 'primary', onClick: fn() },
  },
};
