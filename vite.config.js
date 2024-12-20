import { fileURLToPath, URL } from 'node:url'
import Sitemap from 'vite-plugin-sitemap'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Sitemap()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css :{
    preprocessorOptions : {
      scss: {
        api: "modern",
      }        
    } 
  }
})