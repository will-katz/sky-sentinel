import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const contactApiTarget =
  'https://vzuzy5z5h0.execute-api.us-east-1.amazonaws.com/default'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/contact': {
        target: contactApiTarget,
        changeOrigin: true,
        rewrite: () => '/SkySentinel_ContactForm',
      },
    },
  },
})
