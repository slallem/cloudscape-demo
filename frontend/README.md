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
| [Create React App](https://create-react-app.dev/) (`react-scripts`) | 5.0.1 |

> Note: the app is built on Create React App, which is not compatible with React 19. Staying on React 18 is intentional; a React 19 upgrade would require migrating off CRA first (e.g. to Vite).

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
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## How to build (production)

Create an optimized production build in the `build/` folder:

```bash
npm run build
```

To preview the production build locally with any static server:

```bash
npx serve -s build
```

Notes:
- CI environments (including Vercel) set `CI=true`, which turns lint warnings into build errors. To reproduce that locally, run `CI=true npm run build`.
- The app is served from the site root (`/`); there is no `homepage` field pinning it to a subpath.

## Deployment (Vercel)

The React app lives in this `frontend/` subdirectory, so configure the Vercel project accordingly:

- **Root Directory:** `frontend`
- **Framework Preset:** Create React App (Output Directory `build`)

Client-side routing (deep links / page refresh) is handled by `vercel.json` in this folder, which rewrites all paths to `index.html`.

## Project Structure

- `src/` - Source code
  - `components/` - Reusable UI components
  - `layouts/` - Layout components (navigation, sidebars, etc.)
  - `pages/` - Page components
    - `Dashboard.js` - Main dashboard page
    - `EC2Page.js` - EC2 service page
    - `S3Page.js` - S3 service page
    - `NotFound.js` - 404 page
  - `App.js` - Main application component
  - `index.js` - Application entry point

## Built With

- [React](https://react.dev/) - JavaScript library for building user interfaces
- [AWS Cloudscape Design System](https://cloudscape.design/) - UI components that implement AWS design guidelines
- [React Router](https://reactrouter.com/) - Routing library for React

## Extending the Application

### Adding New Pages

1. Create a new component in the `src/pages` directory
2. Add the component to the routes in `App.js`
3. Add a link to the new page in the navigation menu

### Adding New Components

1. Create a new component in the `src/components` directory
2. Import and use the component in your pages

## Learn More

- [AWS Cloudscape Design System Documentation](https://cloudscape.design/components/)
- [React Documentation](https://react.dev/learn)
