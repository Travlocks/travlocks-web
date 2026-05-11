import type { Meta, StoryObj } from '@storybook/react-vite';

import { Block } from './Block';
import { createRectPoints } from './blockShape';

const defaultConnections = [
  { edgeIndex: 0, type: 'plug' as const, align: 'start' as const },
  { edgeIndex: 1, type: 'socket' as const, align: 'end' as const },
  { edgeIndex: 2, type: 'socket' as const, align: 'start' as const },
  { edgeIndex: 3, type: 'plug' as const, align: 'end' as const },
];

const meta = {
  title: 'Shared/Block/Block',
  component: Block,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Block>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {
  args: {
    category: '식당',
    title: '향라식당',
    duration: '1시간',
    icon: 'food',
    color: 'text-positive',
    points: createRectPoints(150, 300),
    connections: defaultConnections,
  },
};

export const NegativeAccent: Story = {
  args: {
    category: '관광지',
    title: '해운대 해수욕장',
    duration: '3시간',
    icon: 'food',
    color: 'text-negative',
    points: createRectPoints(160, 280),
    connections: defaultConnections,
  },
};
