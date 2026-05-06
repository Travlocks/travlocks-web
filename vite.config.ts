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

import { getResolveAliases } from './resolveAliases';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  // storybook-static 아래 iframe.html·번들이 스캔되면 @emotion/is-prop-valid 등
  // 스토리북 전용 의존성을 앱이 끌어오려 해 오류가 난다. 앱은 index.html만 스캔한다.
  optimizeDeps: {
    entries: [path.resolve(dirname, 'index.html')],
  },
  server: {
    watch: {
      ignored: ['**/storybook-static/**'],
    },
  },
  resolve: {
    alias: [...getResolveAliases(dirname)],
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
