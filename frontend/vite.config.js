import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 👈 Import new compiler module

// https://vitejs.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // 👈 Inject tailwind directly into the active plugins stack
  ],
})
