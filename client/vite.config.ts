// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@user': path.resolve(__dirname, 'src/components/User'),
      '@field': path.resolve(__dirname, 'src/components/Field'),
      '@word': path.resolve(__dirname, 'src/components/Word'),
      '@set': path.resolve(__dirname, 'src/components/Set'),
      '@topic': path.resolve(__dirname, 'src/components/Topic'),
    },
  },
});

