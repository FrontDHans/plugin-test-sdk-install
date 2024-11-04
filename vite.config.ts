import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/plugin-test-sdk-install/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'multi-page/about/index.html'),
        login: resolve(__dirname, 'multi-page/login/index.html'),
      },
    },
  },
});
