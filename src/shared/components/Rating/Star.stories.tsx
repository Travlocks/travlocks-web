import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Star from './Star';

const meta = {
  title: 'Shared/Star',
  component: Star,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    onHover: fn(),
    onClick: fn(),
    onLeave: fn(),
  },
  argTypes: {
    isFilled: { control: 'boolean' },
    size: { control: 'number' },
  },
} satisfies Meta<typeof Star>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: { isFilled: true, size: 40 },
};

export const Empty: Story = {
  args: { isFilled: false, size: 40 },
};

export const Small: Story = {
  args: { isFilled: true, size: 28 },
};
