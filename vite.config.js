import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        pass: resolve(__dirname, 'pass.html'),
        partners: resolve(__dirname, 'partners.html'),
        staff: resolve(__dirname, 'staff.html'),
      },
    },
  },
  server: {
    port: 5000,
    allowedHosts: true,
  },
})
