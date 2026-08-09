import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

const contactApiTarget =
  'https://vzuzy5z5h0.execute-api.us-east-1.amazonaws.com/default'

const contactProxy = {
  '/api/contact': {
    target: contactApiTarget,
    changeOrigin: true,
    rewrite: () => '/SkySentinel_ContactForm',
  },
} as const

/** Emit static HTML shells so S3 can serve deep links like /team. */
function spaRouteShells(routes: string[]): Plugin {
  return {
    name: 'spa-route-shells',
    closeBundle() {
      const outDir = resolve(rootDir, 'dist')
      const indexHtml = resolve(outDir, 'index.html')
      for (const route of routes) {
        const dir = resolve(outDir, route)
        mkdirSync(dir, { recursive: true })
        copyFileSync(indexHtml, resolve(dir, 'index.html'))
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), spaRouteShells(['team'])],
  server: {
    proxy: contactProxy,
  },
  preview: {
    proxy: contactProxy,
  },
})
