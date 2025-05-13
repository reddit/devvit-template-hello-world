import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    outDir: '../../webroot',
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    chunkSizeWarningLimit: 1500,
  },
});
