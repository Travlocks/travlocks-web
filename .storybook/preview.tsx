/// <reference types="vite/client" />

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import type { ComponentType } from 'react';

import { storybookHandlers } from '../src/mocks/storybookHandlers';

import '../src/index.css';

initialize(
  {
    serviceWorker: { url: '/mockServiceWorker.js' },
    onUnhandledRequest: 'bypass',
  },
  storybookHandlers,
);

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story: ComponentType, context) => {
      const entries = context.parameters.memoryRouter?.initialEntries ?? ['/'];
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={entries}>
            <Story />
          </MemoryRouter>
        </QueryClientProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: '^on.*' },
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#ffffff' },
        { name: 'muted', value: '#f9fafb' },
      ],
    },
    viewport: {
      defaultViewport: 'desktop1280',
      viewports: {
        mobile360: {
          name: 'Mobile 360',
          styles: { width: '360px', height: '640px' },
          type: 'mobile',
        },
        mobile393: {
          name: 'Mobile 393',
          styles: { width: '393px', height: '852px' },
          type: 'mobile',
        },
        tablet768: {
          name: 'Tablet 768',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop1280: {
          name: 'Desktop 1280',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
