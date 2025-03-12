import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: '.vite_cache', // Optional: Change cache directory
  server: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  },
  build: {
    assetsInlineLimit: 0, // Disable asset caching
    rollupOptions: {
      output: {
        assetFileNames: '[name].[hash].[ext]', // Cache busting for assets
        chunkFileNames: '[name].[hash].js',
        entryFileNames: '[name].[hash].js',
      },
    },
  },
})
