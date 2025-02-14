import { defineConfig } from "vite";
import fs from 'fs';
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
    https: {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
    allowedHosts: ["kotoba.tokyo"],
    host: "0.0.0.0",
    port: 5173,
  },
});
