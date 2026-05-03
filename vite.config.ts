import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import fs from "fs";
import Sitemap from "vite-plugin-sitemap";

// Dynamically generate routes based on src/routes directory for sitemap
const routesDir = path.resolve(__dirname, "./src/routes");
const dynamicRoutes = fs.existsSync(routesDir)
  ? fs
      .readdirSync(routesDir)
      .filter((file) => file.endsWith(".tsx") && !file.startsWith("__"))
      .map((file) => {
        const name = file.replace(".tsx", "");
        return name === "index" ? "/" : `/${name}`;
      })
  : [];

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    Sitemap({
      hostname: "https://cv.suryaraj.com",
      dynamicRoutes,
      outDir: "public",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
});
