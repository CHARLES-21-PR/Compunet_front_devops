import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.VITE_API_URL || env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        },
        '/storage': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Si el módulo viene de node_modules, lo separa en un chunk independiente
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
