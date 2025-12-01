import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Use the repo name for GitHub Pages, otherwise use root (for Vercel/Local)
  const isGitHubPages = mode === "production" && !env.VERCEL;

  return {
    plugins: [react(), tailwindcss()],
    base: isGitHubPages ? "/lumina-saas/" : "/",
  };
});
