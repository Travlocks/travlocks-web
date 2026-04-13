import type { Meta, StoryObj } from '@storybook/react-vite';

import { withMemoryRouter } from '../../../../.storybook/decorators';
import AuthNavButton from './AuthNavButton';

const meta = {
  title: 'Shared/AuthNavButton',
  component: AuthNavButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [withMemoryRouter('/login')],
} satisfies Meta<typeof AuthNavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnLogin: Story = {};

export const OnSignup: Story = {
  decorators: [withMemoryRouter('/signup')],
};
