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
      { find: '@apis', replacement: '/src/apis' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@data', replacement: '/src/data' },
      { find: '@feature', replacement: '/src/feature' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@shared', replacement: '/src/shared' },
      { find: '@stores', replacement: '/src/stores' },
      { find: '@types', replacement: '/src/types' },
    ],
  },
});
