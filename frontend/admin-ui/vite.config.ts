import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@page_cls_module': path.resolve(__dirname, '../../page_cls_module'),
      '@s3_module': path.resolve(__dirname, '../../s3_module'),
    }
  }
})
