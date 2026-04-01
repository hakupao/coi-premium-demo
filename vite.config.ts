import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repoName = "coi-premium-demo";

export default defineConfig(() => ({
  base: process.env.GITHUB_PAGES === "true" ? `/${repoName}/` : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
