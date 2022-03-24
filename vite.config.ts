import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: true,
    },
    server: {
        host: true,
        port: 3333,
    },
    resolve: {
        alias: {
            "~": resolve(__dirname, "src"),
            assets: resolve(__dirname, "assets"),
        },
    },
    // fix: https://github.com/vitejs/vite/issues/6215
    optimizeDeps: {
        include: ["react/jsx-runtime"],
    },
    define: {
        global: JSON.stringify({}),
        // クラウド上でホスティングしている環境は環境変数からメタ情報を取得する
        cloudEnv: JSON.stringify({ APP_TITLE: process.env.APP_TITLE }),
    },
});
