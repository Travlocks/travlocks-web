import type { Meta, StoryObj } from '@storybook/react-vite';

import Footer from './Footer';

const meta = {
  title: 'Shared/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
