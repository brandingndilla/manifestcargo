import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        try {
          copyFileSync(
            resolve(__dirname, 'public/_redirects'),
            resolve(__dirname, 'dist/_redirects')
          );
          console.log('✓ _redirects copied to dist');
        } catch (e) {
          console.log('⚠ _redirects file not found, skipping copy');
        }
      }
    }
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});