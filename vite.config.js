import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    // GitHub Pages repository path
    base: "/blockchain-overview/",

    server: {
        port: 5173,
        host: "0.0.0.0",
    },

    plugins: [
        vue(),

        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),

        Components({
            resolvers: [ElementPlusResolver()],
            dirs: ["src/components"],
            extensions: ["vue"],
            deep: true,
        }),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },

    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
    },
});