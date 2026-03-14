import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";
// import analyze from "rollup-plugin-analyzer";
// import { VitePWA } from "vite-plugin-pwa";

const htmlPlugin = () => ({
    name: "html-transform",
    transformIndexHtml: (html) => html.replace("__ENV__NAME__", process.env.__EWIZ_ENV__ ?? "live")
});

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src")
        }
    },
    plugins: [
        htmlPlugin(),
        react(),
        {
            // default settings on build (i.e. fail on error)
            ...eslint({ cache: true }),
            apply: "build"
        },
        {
            // do not fail on serve (i.e. local development)
            ...eslint({
                failOnWarning: false,
                failOnError: false
            }),
            apply: "start",
            enforce: "post"
        }
        // vitePWA()
    ],
    build: {
        target: "esnext",
        minify: true, // boolean | 'terser' | 'esbuild' https://vitejs.dev/config/build-options.html#build-minify
        cssCodeSplit: false,
        outDir: "./build",
        rollupOptions: {
            // external: ["@tanstack/react-query"],
            output: {
                dir: "./build",
                entryFileNames: "assets/[name].js",
                assetFileNames: "assets/[name].[ext]",
                chunkFileNames: "assets/[name].js"
            }
            // plugins: [analyze()]
        }
    }
});
