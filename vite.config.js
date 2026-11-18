import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/task-hub/',
  plugins: [
    vue(),
    tailwindcss(), // 激活 Tailwind v4 引擎
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        // 如果模块路径包含 vue、vue-router 或 pinia，就分到 vue-vendor 包
        if (id.includes('node_modules/vue/') || 
            id.includes('node_modules/vue-router/') || 
            id.includes('node_modules/pinia/')) {
          return 'vue-vendor'
        }
      }
    }
  }
}
})