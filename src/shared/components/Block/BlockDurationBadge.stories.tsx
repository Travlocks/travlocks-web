import type { Meta, StoryObj } from '@storybook/react-vite';

import { BlockDurationBadge } from './BlockDurationBadge';

const meta = {
  title: 'Shared/Block/BlockDurationBadge',
  component: BlockDurationBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof BlockDurationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneHour: Story = {
  args: { duration: '1시간' },
};

export const TwoHours: Story = {
  args: { duration: '2시간 30분' },
};
