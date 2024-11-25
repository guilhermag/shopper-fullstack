import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// NIMA-037
export default defineConfig({
  plugins: [react()],
});
