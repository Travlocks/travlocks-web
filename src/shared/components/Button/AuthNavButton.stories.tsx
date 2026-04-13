import type { Meta, StoryObj } from '@storybook/react-vite';

import AuthNavButton from './AuthNavButton';

const meta = {
  title: 'Shared/AuthNavButton',
  component: AuthNavButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    memoryRouter: { initialEntries: ['/login'] },
  },
} satisfies Meta<typeof AuthNavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnLogin: Story = {};

export const OnSignup: Story = {
  parameters: {
    memoryRouter: { initialEntries: ['/signup'] },
  },
};
