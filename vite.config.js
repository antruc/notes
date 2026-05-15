import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: 'public',
  css: {
    devSourcemap: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    base: '/notes/',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html') // eslint-disable-line
      }
    }
  }
})
