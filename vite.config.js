import { defineConfig } from 'vite'

// Static single page — no framework (spec §6).
export default defineConfig({
  build: { target: 'es2018' },
})
