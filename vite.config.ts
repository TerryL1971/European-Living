import { defineConfig } from "vite";
// @ts-expect-error: Vite plugin types not fully compatible with TS
import react from "@vitejs/plugin-react";
// @ts-expect-error: Tailwind Vite plugin types not fully compatible with TS
import tailwindcss from "@tailwindcss/vite";
import { plugin as markdown, Mode } from "vite-plugin-markdown";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    markdown({ mode: [Mode.HTML] })
  ],
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
