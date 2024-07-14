import { defineConfig } from 'vite'
import path from "node:path";
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
    testMatch: ['src/__tests__/**/*.test.tsx'],
    globals: true
  }
})
