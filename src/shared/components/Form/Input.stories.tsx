import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormProvider, useForm } from 'react-hook-form';

import Input from './Input';

type StoryFieldValues = {
  storyEmail: string;
  storyPassword: string;
  storyNickname: string;
};

function EmailTopStory() {
  const methods = useForm<StoryFieldValues>({
    defaultValues: { storyEmail: '' },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-full min-w-[320px] p-4">
        <Input register={methods.register('storyEmail')} type="email" label="top" placeholder="이메일을 입력하세요" />
      </div>
    </FormProvider>
  );
}

function PasswordTopStory() {
  const methods = useForm<StoryFieldValues>({
    defaultValues: { storyPassword: '' },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-full min-w-[320px] p-4">
        <Input register={methods.register('storyPassword')} type="password" label="top" placeholder="비밀번호" />
      </div>
    </FormProvider>
  );
}

function EmailLeftStory() {
  const methods = useForm<StoryFieldValues>({
    defaultValues: { storyEmail: '' },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-full min-w-[320px] p-4">
        <Input register={methods.register('storyEmail')} type="email" label="left" placeholder="이메일" />
      </div>
    </FormProvider>
  );
}

function WithCancelStory() {
  const methods = useForm<StoryFieldValues>({
    defaultValues: { storyNickname: '닉네임' },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-full min-w-[320px] p-4">
        <Input register={methods.register('storyNickname')} type="text" label="left" hasCancel placeholder="닉네임" />
      </div>
    </FormProvider>
  );
}

function ErrorStateStory() {
  const methods = useForm<StoryFieldValues>({
    defaultValues: { storyEmail: '' },
  });

  return (
    <FormProvider {...methods}>
      <div className="w-full min-w-[320px] p-4">
        <Input register={methods.register('storyEmail')} type="email" label="top" error placeholder="에러 상태" />
      </div>
    </FormProvider>
  );
}

const meta = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmailLabelTop: Story = {
  render: () => <EmailTopStory />,
};

export const PasswordLabelTop: Story = {
  render: () => <PasswordTopStory />,
};

export const EmailLabelLeft: Story = {
  render: () => <EmailLeftStory />,
};

export const WithCancel: Story = {
  render: () => <WithCancelStory />,
};

export const ErrorState: Story = {
  render: () => <ErrorStateStory />,
};
