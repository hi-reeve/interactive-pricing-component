import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import ViteComponents from "vite-plugin-components";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), ViteComponents()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
