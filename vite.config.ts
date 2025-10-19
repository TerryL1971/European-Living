import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { plugin as markdown, Mode } from "vite-plugin-markdown";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), markdown({ mode: [Mode.HTML] })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-markdown': ['react-markdown', 'remark-gfm', 'rehype-raw', 'rehype-sanitize'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
});