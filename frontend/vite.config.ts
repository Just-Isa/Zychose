/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    passWithNoTests: true,
    watch: false,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      },
      "/stompbroker": {
        target: "http://localhost:8080",
        ws: true,
      },
    },
  },
});
