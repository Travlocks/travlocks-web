import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import Checkbox from './Checkbox';

function CheckboxPlayground({
  outline,
  initialChecked,
  text,
}: {
  outline: boolean;
  initialChecked: boolean;
  text: string;
}) {
  const [checked, setChecked] = useState(initialChecked);
  return <Checkbox text={text} outline={outline} checked={checked} onChange={setChecked} />;
}

const meta = {
  title: 'Shared/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OutlineUnchecked: Story = {
  render: () => <CheckboxPlayground outline initialChecked={false} text="약관에 동의합니다" />,
};

export const OutlineChecked: Story = {
  render: () => <CheckboxPlayground outline initialChecked text="약관에 동의합니다" />,
};

export const Plain: Story = {
  render: () => <CheckboxPlayground outline={false} initialChecked={false} text="선택 항목" />,
};
