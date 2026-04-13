import type { Meta, StoryObj } from '@storybook/react-vite';

import type { SidebarBlock } from '@/feature/block/blockBuild/types/block';

import BlockItemUI from './BlockItemUI';

const sampleBlock: SidebarBlock = {
  id: 1,
  name: '테스트 맛집',
  category: '식당',
  duration: '2시간',
};

const sampleWithImage: SidebarBlock = {
  id: 2,
  name: '이미지 있는 블록',
  category: '카페',
  duration: '1시간',
  imageUrl: 'https://placehold.co/120x120/png',
};

const meta = {
  title: 'Shared/Block/BlockItemUI',
  component: BlockItemUI,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof BlockItemUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutImage: Story = {
  args: { item: sampleBlock },
  decorators: [
    (S) => (
      <div className="w-[320px] p-4">
        <S />
      </div>
    ),
  ],
};

export const WithImage: Story = {
  args: { item: sampleWithImage },
  decorators: [
    (S) => (
      <div className="w-[320px] p-4">
        <S />
      </div>
    ),
  ],
};
