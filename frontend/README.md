# AWS Console Clone with Cloudscape Design System

This project is a React application that mimics the look and feel of the AWS Management Console using the AWS Cloudscape Design System.

**🔗 Live demo:** https://cloudscape-demo.vercel.app/

## Features

- AWS Console-like user interface
- Responsive design
- Mock implementations of popular AWS services (EC2, S3)
- Built with JavaScript for rapid development

## Tech stack / main versions

| Library | Version |
| --- | --- |
| [React](https://react.dev/) / React DOM | 18.3.1 |
| [React Router](https://reactrouter.com/) (`react-router-dom`) | 6.30.4 |
| [Cloudscape Components](https://cloudscape.design/) (`@cloudscape-design/components`) | 3.0.1330 |
| [Cloudscape Global Styles](https://cloudscape.design/) (`@cloudscape-design/global-styles`) | 1.0.62 |
| [Vite](https://vite.dev/) (`vite`, `@vitejs/plugin-react`) | 6.4.3 / 4.7.0 |

> Note: the app was migrated from Create React App to Vite. React is still pinned to 18;
> upgrading to React 19 is now possible and no longer blocked by the build tooling.

## Getting Started

### Prerequisites

- Node.js v18 or later
- npm (bundled with Node.js)

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## How to run (development)

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

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

## How to build (production)

Create an optimized production build in the `dist/` folder:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

Notes:
- The app is served from the site root (`/`); there is no `base` option pinning it to a subpath.
- `api/` handlers use CommonJS (`module.exports`), so `package.json` intentionally has no `"type": "module"`; the Vite config is named `vite.config.mjs` instead.

## Deployment (Vercel)

The React app lives in this `frontend/` subdirectory, so configure the Vercel project accordingly:

- **Root Directory:** `frontend`
- **Framework Preset:** Vite (Output Directory `dist`)

Client-side routing (deep links / page refresh) is handled by `vercel.json` in this folder, which rewrites all paths to `index.html`.

## Project Structure

- `index.html` - HTML entry point (Vite serves it from the project root)
- `vite.config.mjs` - Vite config, including the dev-only `api/` mounting plugin
- `src/` - Source code
  - `components/` - Reusable UI components
  - `layouts/` - Layout components (navigation, sidebars, etc.)
  - `pages/` - Page components (`DashboardPage.jsx`, `ServersPage.jsx`, `StoragePage.jsx`, `NotFound.jsx`, …)
  - `App.jsx` - Main application component
  - `main.jsx` - Application entry point

## Built With

- [React](https://react.dev/) - JavaScript library for building user interfaces
- [AWS Cloudscape Design System](https://cloudscape.design/) - UI components that implement AWS design guidelines
- [React Router](https://reactrouter.com/) - Routing library for React

## Extending the Application

### Adding New Pages

1. Create a new component in the `src/pages` directory
2. Add the component to the routes in `App.jsx`
3. Add a link to the new page in the navigation menu

### Adding New Components

1. Create a new component in the `src/components` directory
2. Import and use the component in your pages

## Learn More

- [AWS Cloudscape Design System Documentation](https://cloudscape.design/components/)
- [React Documentation](https://react.dev/learn)
