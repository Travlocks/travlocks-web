import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FormProvider, useForm } from 'react-hook-form';

import TextField from './TextField';

function BasicStory() {
  const methods = useForm({ defaultValues: { nickname: '' } });
  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-md p-4">
        <TextField
          label="닉네임"
          register={methods.register('nickname')}
          placeholder="닉네임을 입력해주세요"
          onClear={fn()}
        />
      </div>
    </FormProvider>
  );
}

function WithErrorStory() {
  const methods = useForm({ defaultValues: { nickname: '' } });
  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-md p-4">
        <TextField
          label="닉네임"
          register={methods.register('nickname')}
          error="2자 이상 입력해주세요"
          placeholder="닉네임"
        />
      </div>
    </FormProvider>
  );
}

function WithHelperStory() {
  const methods = useForm({ defaultValues: { bio: '' } });
  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-md p-4">
        <TextField
          label="한 줄 소개"
          register={methods.register('bio')}
          helperText="다른 사용자에게 보여집니다."
          placeholder="소개를 입력하세요"
        />
      </div>
    </FormProvider>
  );
}

const meta = {
  title: 'Shared/TextField',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <BasicStory />,
};

export const WithError: Story = {
  render: () => <WithErrorStory />,
};

export const WithHelperText: Story = {
  render: () => <WithHelperStory />,
};
