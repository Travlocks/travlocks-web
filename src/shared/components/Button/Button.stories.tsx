import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Button from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'gradient'],
    },
    disabled: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    text: { control: 'text' },
    bg: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Primary 버튼',
    variant: 'primary',
  },
};

export const Gradient: Story = {
  args: {
    text: 'Gradient 버튼',
    variant: 'gradient',
  },
};

export const WithIcon: Story = {
  args: {
    text: '아이콘과 함께',
    variant: 'primary',
    showIcon: true,
  },
};

export const Disabled: Story = {
  args: {
    text: '비활성',
    disabled: true,
  },
};
