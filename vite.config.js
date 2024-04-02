import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './src',
  mode: 'development',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    minify: false,
    outDir: '../dist',
    rollupOptions: {
      external: ['/node_modules/', '/src/'],
      output: {
        entryFileNames: 'assets/[name].js', 
        chunkFileNames: 'assets/[name].[ext]',
        assetFileNames: 'assets/[name].[ext]',
      }
    }
  }
})
