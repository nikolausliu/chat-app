import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const resolve = (dir) => path.resolve(__dirname, '.', dir)

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  plugins: [vue()]
})
