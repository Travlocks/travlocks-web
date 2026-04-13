/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: path.join(dirname, 'src') },
      { find: '@feature', replacement: path.join(dirname, 'src/feature') },
      { find: '@pages', replacement: path.join(dirname, 'src/pages') },
      { find: '@shared', replacement: path.join(dirname, 'src/shared') },
      { find: '@apis', replacement: path.join(dirname, 'src/shared/apis') },
      { find: '@assets', replacement: path.join(dirname, 'src/shared/assets') },
      { find: '@components', replacement: path.join(dirname, 'src/shared/components') },
      { find: '@constants', replacement: path.join(dirname, 'src/shared/constants') },
      { find: '@data', replacement: path.join(dirname, 'src/shared/data') },
      { find: '@hooks', replacement: path.join(dirname, 'src/shared/hooks') },
      { find: '@layouts', replacement: path.join(dirname, 'src/shared/layouts') },
      { find: '@routes', replacement: path.join(dirname, 'src/shared/routes') },
      { find: '@stores', replacement: path.join(dirname, 'src/shared/stores') },
      { find: '@types', replacement: path.join(dirname, 'src/shared/types') },
      { find: '@utils', replacement: path.join(dirname, 'src/shared/utils') },
    ],
  },
  assetsInclude: ['**/*.lottie'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetsInfo) => {
          if (assetsInfo.name?.endsWith('.lottie')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
});
