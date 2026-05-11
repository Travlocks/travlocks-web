import type { Meta, StoryObj } from '@storybook/react-vite';

import { BlockContent } from './BlockContent';

const meta = {
  title: 'Shared/Block/BlockContent',
  component: BlockContent,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    icon: { control: 'text' },
  },
} satisfies Meta<typeof BlockContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Food: Story = {
  args: {
    icon: 'food',
    category: '식당',
    title: '향라식당',
  },
};

export const Lodging: Story = {
  args: {
    icon: 'food',
    category: '숙소',
    title: '강릉 오션뷰 호텔',
  },
};
