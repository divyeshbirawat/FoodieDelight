import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    define: {
      'import.meta.env.VITE_USERNAME': JSON.stringify('admin@res.com'),
      'import.meta.env.VITE_PASSWORD': JSON.stringify('password'),
    },
  },
});
