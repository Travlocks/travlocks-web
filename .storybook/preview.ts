/// <reference types="vite/client" />

import type { Preview } from '@storybook/react-vite';

import '../src/index.css';

const preview: Preview = {
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
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
