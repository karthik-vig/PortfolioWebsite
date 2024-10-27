import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteCompression from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    viteCompression()
  ],
  build: {
    emptyOutDir: true,
    reportCompressedSize: true,
    minify: true,
  },
})
