import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MySDK',
      fileName: 'my-sdk'
    },
    rollupOptions: {
      external: [], // Add external dependencies here
      output: {
        globals: {} // Add global names for external dependencies here
      }
    }
  },
  plugins: [dts()]
});