import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path'
import * as dns from "dns";
import {nodePolyfills} from "vite-plugin-node-polyfills";
dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
    basicSsl(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: './dist',
  },
  base: './',
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, 'api')
      },
      '/web': {
        target: 'http://localhost',
        changeOrigin: false,
      },
      '/img': {
        target: 'http://localhost',
        changeOrigin: false,
      }
    },
    // cors: {
    //   origin: 'https://localhost',
    //   credentials: true,
    // }
  }
});
