import type { Meta, StoryObj } from '@storybook/react-vite';

import { toast } from '@/shared/stores/toastStore';

import ToastContainer from './Toast';

function ToastPlayground() {
  return (
    <div className="min-h-[200px] p-6 space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-primary-color px-3 py-2 text-sm text-white"
          onClick={() => toast.success('저장되었습니다')}>
          success
        </button>
        <button
          type="button"
          className="rounded bg-negative px-3 py-2 text-sm text-white"
          onClick={() => toast.error('문제가 발생했습니다')}>
          error
        </button>
        <button
          type="button"
          className="rounded bg-[#FF69B4] px-3 py-2 text-sm text-white"
          onClick={() => toast.favorite('찜했습니다')}>
          favorite
        </button>
        <button
          type="button"
          className="rounded bg-base-color-2 px-3 py-2 text-sm text-white"
          onClick={() => toast.unfavorite('찜 해제')}>
          unfavorite
        </button>
      </div>
      <p className="b6 text-base-color-2">버튼을 누르면 토스트가 뜹니다 (약 2초 후 사라짐).</p>
      <ToastContainer />
    </div>
  );
}

const meta = {
  title: 'Shared/Toast',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <ToastPlayground />,
};
