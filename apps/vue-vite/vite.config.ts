import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '') as ImportMetaEnv

  return {
    plugins: [
      vue(),
      tailwindcss(),
      vueDevTools(),
    ],
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT) : 5173,
      proxy: {
        '/api': {
          target: `http://localhost:${env.VITE_API_PORT ?? 8000}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@/core': fileURLToPath(new URL('../../vue-core/src', import.meta.url)),
        'vue-core': fileURLToPath(new URL('../../vue-core/src', import.meta.url))
      },
    },
  }
})
