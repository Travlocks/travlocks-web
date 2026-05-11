import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

import { getResolveAliases } from '../resolveAliases.ts';

const sbDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(sbDir, '..');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    'msw-storybook-addon',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      resolve: {
        alias: [...getResolveAliases(projectRoot)],
      },
      assetsInclude: ['**/*.lottie'],
    });
  },
};

export default config;
