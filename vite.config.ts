import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@feature', replacement: '/src/feature' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@shared', replacement: '/src/shared' },
      { find: '@apis', replacement: '/src/shared/apis' },
      { find: '@assets', replacement: '/src/shared/assets' },
      { find: '@components', replacement: '/src/shared/components' },
      { find: '@constants', replacement: '/src/shared/constants' },
      { find: '@data', replacement: '/src/shared/data' },
      { find: '@hooks', replacement: '/src/shared/hooks' },
      { find: '@layouts', replacement: '/src/shared/layouts' },
      { find: '@routes', replacement: '/src/shared/routes' },
      { find: '@stores', replacement: '/src/shared/stores' },
      { find: '@types', replacement: '/src/shared/types' },
      { find: '@utils', replacement: '/src/shared/utils' },
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
});
