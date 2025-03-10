import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
    tsconfigPaths()
  ],
  esbuild: {
    target: "esnext",
    platform: "node",
  },
  server: {
    allowedHosts: ["localhost", "admin.kotoba.tokyo"],
    host: "0.0.0.0",
    port: 5173,
  },
});
