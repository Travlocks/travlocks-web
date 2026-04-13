import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import SocialLoginButton from './SocialLoginButton';

const meta = {
  title: 'Shared/SocialLoginButton',
  component: SocialLoginButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { onClick: fn() },
  argTypes: {
    provider: { control: 'select', options: ['naver', 'google'] },
  },
} satisfies Meta<typeof SocialLoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Naver: Story = {
  args: { provider: 'naver' },
};

export const Google: Story = {
  args: { provider: 'google' },
};
