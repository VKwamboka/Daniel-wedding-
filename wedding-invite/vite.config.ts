import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// base: './' keeps asset paths relative, so the built site works from any
// sub-folder (GitHub Pages, Netlify, a plain file server…).
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
});
