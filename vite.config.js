import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    cssCodeSplit: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
