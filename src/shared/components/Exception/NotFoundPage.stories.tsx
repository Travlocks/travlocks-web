import type { Meta, StoryObj } from '@storybook/react-vite';

import NotFoundPage from './NotFoundPage';

const meta = {
  title: 'Shared/Exception/NotFoundPage',
  component: NotFoundPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    memoryRouter: { initialEntries: ['/404'] },
  },
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
