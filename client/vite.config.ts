import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,      // Wymuszamy port 5173
    strictPort: false, // Jeśli zajęty, spróbuj następnego
    host: true       // Nasłuchuj na wszystkich adresach (rozwiązuje problemy z Dockerem/Siecią)
  }
})