// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@user': path.resolve(__dirname, 'src/components/User'),
      '@field': path.resolve(__dirname, 'src/components/Field'),
      '@word': path.resolve(__dirname, 'src/components/Word'),
      '@set': path.resolve(__dirname, 'src/components/Set'),
      '@topic': path.resolve(__dirname, 'src/components/Topic'),
      '@data' : path.resolve(__dirname, 'src/components/Data'), 
      '@logic' : path.resolve(__dirname, 'src/components/Logic'), 
    },
  },
  plugins: [react(), tsconfigPaths()],
});

