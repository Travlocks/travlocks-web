import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import StarRating from './StarRating';

const meta = {
  title: 'Shared/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onRatingChange: fn() },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { initialRating: 0, size: 40 },
};

export const ThreeStars: Story = {
  args: { initialRating: 3, size: 40 },
};

export const Full: Story = {
  args: { initialRating: 5, size: 32 },
};
