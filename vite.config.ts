import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  esbuild: {
    target: 'es2020'
  },
  server: {
    fs: {
      strict: true
    }
  },
  optimizeDeps: {
    include: ['lit']
  }
})