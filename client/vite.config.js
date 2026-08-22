import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        const source = resolve(__dirname, 'public/_redirects');
        const destDir = resolve(__dirname, 'dist');
        const dest = resolve(destDir, '_redirects');

        try {
          if (!existsSync(destDir)) {
            mkdirSync(destDir, { recursive: true });
          }
          if (existsSync(source)) {
            copyFileSync(source, dest);
            console.log('✅ _redirects copied to dist');
          } else {
            console.log('⚠️ _redirects not found in public folder');
          }
        } catch (error) {
          console.error('❌ Error copying _redirects:', error.message);
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