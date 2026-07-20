import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// CSP only on build, dev needs inline scripts and ws for HMR
const csp = {
  name: 'csp',
  apply: 'build',
  transformIndexHtml() {
    return [
      {
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; style-src 'self' 'unsafe-inline'"
        },
        injectTo: 'head'
      }
    ]
  }
}

export default defineConfig({
  base: '/notes/',
  plugins: [vue(), csp]
})
