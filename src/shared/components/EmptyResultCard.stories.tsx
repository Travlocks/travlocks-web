import type { Meta, StoryObj } from '@storybook/react-vite';

import { withMemoryRouter } from '../../../.storybook/decorators';
import EmptyResultCard from './EmptyResultCard';

const meta = {
  title: 'Shared/EmptyResultCard',
  component: EmptyResultCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [withMemoryRouter('/')],
} satisfies Meta<typeof EmptyResultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '아직 쌓인 블록이 없어요',
    label: '첫 여행 블록을 만들어보세요',
  },
  decorators: [
    (S) => (
      <div className="w-full max-w-[1218px] p-6">
        <S />
      </div>
    ),
  ],
};
