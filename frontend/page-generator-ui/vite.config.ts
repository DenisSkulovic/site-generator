import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@page_cls_module': path.resolve(__dirname, '../../page_cls_module'),
      '@common_components_module': path.resolve(__dirname, '../common_components_module'),
    }
  }
})
