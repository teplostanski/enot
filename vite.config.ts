import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '', // add dots in path to index.html on build
  plugins: [react()],
})
