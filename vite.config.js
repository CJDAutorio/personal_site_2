import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['aws-amplify'],
    },
  },
  define: {
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  }
})