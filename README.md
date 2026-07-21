# cloudscape-demo

A sample front-end app that mimics the look and feel of the AWS Management Console,
built with [Cloudscape](https://cloudscape.design/) (the AWS console design system).

**🔗 Live demo: https://slallem-cloudscape-demo.vercel.app/**

## Features

- AWS Console-like user interface
- Responsive design, light and dark mode
- Mock implementations of popular AWS services (EC2, S3)
- Built with JavaScript for rapid development

## Tech stack / main versions

| Library | Version |
| --- | --- |
| [React](https://react.dev/) / React DOM | 19.2.7 |
| [React Router](https://reactrouter.com/) (`react-router-dom`) | 6.30.4 |
| [Cloudscape Components](https://cloudscape.design/) (`@cloudscape-design/components`) | 3.0.1330 |
| [Cloudscape Global Styles](https://cloudscape.design/) (`@cloudscape-design/global-styles`) | 1.0.62 |
| [Vite](https://vite.dev/) (`vite`, `@vitejs/plugin-react`) | 6.4.3 / 4.7.0 |

> Note: the app was migrated from Create React App to Vite, which unblocked the move to
> React 19. Cloudscape declares a permissive `react: ">=16.8.0"` peer range rather than
> explicit React 19 support, so the combination is validated by running the app, not by
> the dependency ranges.

## Getting started

Prerequisites: Node.js v18 or later, and npm (bundled with Node.js).

```bash
npm install     # install dependencies
npm run dev     # dev server with hot reload at http://localhost:3000
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

## Backend API (Vercel Serverless Functions)

Simple backend endpoints live in the [`api/`](./api) folder. Each file is deployed
by Vercel as an on-demand serverless function, reachable at `/api/<filename>`.

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/servers` | GET | Returns a mocked list of servers (`{ servers: [...] }`). |

The Servers page (`src/pages/ServersPage.jsx`) consumes this endpoint via `fetch`,
with loading and error states.

> Local development: `npm run dev` mounts every function in `api/` on the Vite dev
> server (see the `dev-api` plugin in `vite.config.mjs`), so `/api/*` calls work
> locally without Vercel. The plugin is dev-only; in production Vercel serves the
> same files as real serverless functions. `npx vercel dev` also works if you want
> the full Vercel runtime.

## Deployment (Vercel)

The app lives at the repository root, so the Vercel project needs no Root Directory override:

- **Root Directory:** `.` (repository root)
- **Framework Preset:** Vite (Output Directory `dist`)

Both are also pinned in [`vercel.json`](./vercel.json), which additionally rewrites all
paths to `index.html` so client-side routing survives deep links and page refreshes.

Notes:
- The app is served from the site root (`/`); there is no `base` option pinning it to a subpath.
- `api/` handlers use CommonJS (`module.exports`), so `package.json` intentionally has no
  `"type": "module"`; the Vite config is named `vite.config.mjs` instead.

## Project structure

- `index.html` - HTML entry point (Vite serves it from the project root)
- `vite.config.mjs` - Vite config, including the dev-only `api/` mounting plugin
- `api/` - Vercel serverless functions
- `public/` - static assets served as-is from the site root
- `src/` - source code
  - `components/` - reusable UI components
  - `contexts/` - React contexts (auth)
  - `pages/` - page components (`DashboardPage.jsx`, `ServersPage.jsx`, `StoragePage.jsx`, `NotFound.jsx`, …)
  - `App.jsx` - main application component
  - `main.jsx` - application entry point

## Extending the application

**Adding a page:** create a component in `src/pages`, add it to the routes in `App.jsx`,
then add a link in the navigation menu.

**Adding a component:** create it in `src/components` and import it in your pages.

## Learn more

- [Cloudscape Design System documentation](https://cloudscape.design/components/)
- [React documentation](https://react.dev/learn)
- [Vite documentation](https://vite.dev/guide/)
