/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// Detect environment and build HMR host
const GITPOD_ID = process.env.GITPOD_ENVIRONMENT_ID;
const FLY_APP_NAME = process.env.FLY_APP_NAME;

let PUBLIC_HOST: string;
if (FLY_APP_NAME) {
  // Fly.io: use app name for the host
  PUBLIC_HOST = `${FLY_APP_NAME}.fly.dev`;
} else if (GITPOD_ID) {
  // Gitpod: build from environment ID
  const REGION = "us-east-1-01.gitpod.dev";
  PUBLIC_HOST = `5173--${GITPOD_ID}.${REGION}`;
} else {
  // Local development
  PUBLIC_HOST = "localhost:5173";
}

export default defineConfig(({ mode }) => {
  // Load env variables from .env files (if they exist for local dev)
  const env = loadEnv(mode, process.cwd(), '');

  return {
  plugins: [react(), tailwindcss()],
  base: "/",
  define: {
    // Environment variables with fallback defaults for deployment
    'import.meta.env.VITE_SHORT_DATE_FORMAT': JSON.stringify(
      env.VITE_SHORT_DATE_FORMAT || 'YYYY-MM-DD'
    ),
    'import.meta.env.VITE_API_URL': JSON.stringify(
      env.VITE_API_URL || 'https://fsma.trackvision.ai'
    ),
    'import.meta.env.VITE_API_ACCESS_TOKEN': JSON.stringify(
      env.VITE_API_ACCESS_TOKEN || 'PEuCyS_G_aRSi-HHAP7zm_qNoESKdJs3'
    ),
    'import.meta.env.VITE_MAPBOX_ACCESS_TOKEN': JSON.stringify(
      'pk.eyJ1IjoidHJhY2t2aXNpb25haSIsImEiOiJjbG5mdjN6ZWwwcmJyMmpxcHhiMzI4ZzBvIn0.VnKY6lDtd8OdroSIe7Q5aQ'
    ),
  },
  server: {
    allowedHosts: ['.gitpod.dev', '.fly.dev', 'localhost'],
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,            // avoid bumping to 5174+
    // NOTE: intentionally no `https` here (defaults to http)
    // If your Vite version complains about unknown keys:
    // - remove `allowedHosts` (Vite doesn't use it).
    // - keep only the keys shown here.

    origin: `https://${PUBLIC_HOST}`,   // make client use absolute public origin

    hmr: {
      protocol: "wss",
      host: PUBLIC_HOST,         // browser-visible host
      clientPort: 443,           // browser connects over TLS
      // DO NOT set `port` here; leave the HMR server bound to 5173
      // path: "/@vite"          // default
    },
    watch: {
      usePolling: true,              // Required: Docker overlayfs breaks inotify
      interval: 100,                 // Poll interval (ms)
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100
      }
    },
  },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          utils: ["axios"],
          ui: ["lucide-react"],
        },
      },
    },
    target: "es2015",
    minify: "esbuild",
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  };
});
