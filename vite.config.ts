import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // CRITICAL: Ensures assets are loaded relatively (fixes GitHub Pages blank screen)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});