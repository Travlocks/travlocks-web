import type { Meta, StoryObj } from '@storybook/react-vite';

import { withQueryAndRouter } from '../../../../.storybook/decorators';
import Navbar from './Navbar';

const meta = {
  title: 'Shared/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [withQueryAndRouter('/')],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
