import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split out specific dependencies
          lottie: ["lottie-react"],
          react: ["react", "react-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 800, // Adjust chunk size warning limit (optional)
  },
})
