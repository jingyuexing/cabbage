import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],
  build: {
    minify: "terser",
    manifest: false,
    sourcemap: false,
    outDir: "dist",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
        dead_code:true
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vue": ["vue","vue-router"],
          "pina":["pinia"],
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@hook": resolve(__dirname, "./src/hook"),
      "@views": resolve(__dirname, "./src/views"),
      "@components": resolve(__dirname, "./src/components"),
      "@store": resolve(__dirname, "./src/store"),
    },
  },
});
