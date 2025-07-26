import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  esbuild: {
    target: 'es2020'
  }
})