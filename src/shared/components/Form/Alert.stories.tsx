import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Alert from './Alert';

const meta = {
  title: 'Shared/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    type: 'alert',
    text: '닉네임은 2자 이상 ~ 10자 이하로 입력해주세요',
    width: 440,
  },
};

export const CheckWithResend: Story = {
  args: {
    type: 'check',
    text: '인증 메일이 발송되었습니다.',
    width: 440,
    onClick: fn(),
  },
};
