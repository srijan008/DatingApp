import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
  optimizeDeps: {
    exclude: ['jsonwebtoken', 'jws'] // Exclude JWT libraries if not needed
  }
})
