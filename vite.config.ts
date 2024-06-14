import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    }),
    VueDevTools(),
    {
      name: 'svg-loader',
      enforce: 'pre',
      apply: 'build',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // if (req.url.includes('.svg') && !req.url.includes('src/icons')) {
          //   req.url += '?raw'
          // }
          // next()
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'localhost:8080/api',
        changeOrigin: true,
        rewrite: (path) => path.replace('^/api', '')
      }
    }
  },
  optimizeDeps: {
    include: ['vue-i18n']
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-i18n': ['vue-i18n/dist/vue-i18n.cjs.js']
        }
      }
    }
  }
})
