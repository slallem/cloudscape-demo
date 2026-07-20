import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Local development only. It mounts every function in ./api on the Vite dev
// server so that `/api/*` calls work locally without Vercel.
//
// This plugin is NOT part of the production build: Vercel serves the api/
// folder as real serverless functions.
function devApiPlugin() {
  const apiDir = path.join(rootDir, 'api');

  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      if (!fs.existsSync(apiDir)) return;

      for (const file of fs.readdirSync(apiDir).filter((f) => f.endsWith('.js'))) {
        const route = '/api/' + file.replace(/\.js$/, '');
        const handler = require(path.join(apiDir, file));

        server.middlewares.use(route, (req, res) => {
          // Vercel handlers get a few Express-style helpers that a plain
          // Node response object doesn't have, so shim the ones we use.
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (body) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(body));
            return res;
          };
          req.query = Object.fromEntries(
            new URL(req.url, 'http://localhost').searchParams
          );

          handler(req, res);
        });

        // eslint-disable-next-line no-console
        console.log(`[dev api] mounted ${route}`);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), devApiPlugin()],
  server: {
    port: 3000,
    open: true,
  },
});