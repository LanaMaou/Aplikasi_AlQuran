import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/equran-api": {
        target: "https://equran.id/api/v2",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/equran-api/, ""),
      },
    },
  },
});
