import type { Meta, StoryObj } from '@storybook/react-vite';

import Loading from './Loading';

const meta = {
  title: 'Shared/Exception/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
