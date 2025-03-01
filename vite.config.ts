import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  esbuild: {
    target: "esnext",
    platform: "node",
  },
  server: {
    allowedHosts: ["kotoba.tokyo"],
    host: "0.0.0.0",
    port: 5173,
  },
});
