import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import SingleButton from './SingleButton';

const meta = {
  title: 'Shared/SingleButton',
  component: SingleButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onClick: fn() },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'white', 'negative'] },
    width: { control: 'number' },
    height: { control: 'number' },
    textSize: { control: 'select', options: [18, 20] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SingleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: '변경사항 저장',
    width: 217,
    height: 65,
    textSize: 20,
    variant: 'primary',
  },
};

export const White: Story = {
  args: {
    text: '취소',
    width: 215,
    height: 64,
    textSize: 20,
    variant: 'white',
  },
};

export const Negative: Story = {
  args: {
    text: '삭제',
    width: 200,
    height: 56,
    textSize: 18,
    variant: 'negative',
  },
};

export const FullWidth: Story = {
  args: {
    text: '전체 너비',
    width: 'full',
    height: 56,
    textSize: 18,
    variant: 'primary',
  },
  decorators: [
    (S) => (
      <div className="w-full max-w-md p-4">
        <S />
      </div>
    ),
  ],
};
