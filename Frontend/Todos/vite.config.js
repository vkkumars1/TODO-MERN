import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default {
  build: {
    sourcemap: false, // Disable sourcemaps in production
  },
  plugins: [react()],
};