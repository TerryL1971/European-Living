import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ✅ Clean working setup for React 19 + TailwindCSS v4
export default defineConfig({
  assetsInclude: ["**/*.md"],
  plugins: [
    react(),
    tailwindcss(), // <-- No arguments! New Tailwind plugin works automatically
  ],
});
