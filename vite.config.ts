import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    // If we are building for Vercel, use root '/'.
    // If for GitHub Pages, use the repo name.
    base: env.VERCEL ? "/" : "/lumina-saas/",
  };
});
