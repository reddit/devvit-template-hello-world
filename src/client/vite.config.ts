import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  logLevel: 'warn',
  build: {
    outDir: "../../dist/client",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        splash: "splash/splash.html",
        game: "game/game.html",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]",
        sourcemapFileNames: "[name].js.map",
      },
    },
  },
});
