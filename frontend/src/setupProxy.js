// Local development only — automatically loaded by the Create React App dev server
// (`npm start`). It mounts every function in ../api on the dev server so that
// `/api/*` calls work locally without Vercel.
//
// This file is NOT part of the production build and is ignored by Vercel, which
// serves the api/ folder as real serverless functions.
const fs = require('fs');
const path = require('path');

module.exports = function (app) {
  const apiDir = path.join(__dirname, '..', 'api');
  if (!fs.existsSync(apiDir)) return;

  fs.readdirSync(apiDir)
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
      const route = '/api/' + file.replace(/\.js$/, '');
      const handler = require(path.join(apiDir, file));
      // Vercel-style (req, res) handlers are Express-compatible.
      app.all(route, (req, res) => handler(req, res));
      // eslint-disable-next-line no-console
      console.log(`[dev api] mounted ${route}`);
    });
};
