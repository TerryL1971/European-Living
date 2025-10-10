import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { plugin as markdown, Mode } from "vite-plugin-markdown";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    // Allow .md files to be imported as both HTML and raw text
    markdown({ mode: [Mode.HTML, Mode.MARKDOWN] }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  assetsInclude: ["**/*.md"], // 👈 ensures markdown files are treated as assets
});
