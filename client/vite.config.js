import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/user': {
        target: 'http://localhost:8000', // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, '/user'), // Maintain '/user' path
      },
      '/jokes': {
        target: 'http://localhost:8000', // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jokes/, '/jokes'), // Keep `/jokes` path
      },
    },
  
  },
});
