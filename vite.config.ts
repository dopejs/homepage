import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';

/** Routes are static files in production; in dev they all render from index.html. */
function routeFallback(): Plugin {
  return {
    name: 'dopejs-route-fallback',
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const url = request.url ?? '/';
        if (url.startsWith('/projects/') && !url.includes('.')) request.url = '/';
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), routeFallback()],
  build: { outDir: 'dist', emptyOutDir: true, sourcemap: true },
});
