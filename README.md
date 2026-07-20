# cloudscape-demo

A sample app made with [Cloudscape](https://cloudscape.design/) (AWS console UI framework).

**🔗 Live demo: https://cloudscape-demo.vercel.app/**

The application lives in the [`frontend/`](./frontend) directory. See [`frontend/README.md`](./frontend/README.md) for full documentation.

## Main versions

- React / React DOM 18.3.1
- React Router (`react-router-dom`) 6.30.4
- Cloudscape Components 3.0.1330 · Global Styles 1.0.62
- Vite 6.4.3 (`@vitejs/plugin-react` 4.7.0)

## Quick start

```bash
cd frontend
npm install     # install dependencies
npm run dev     # run dev server at http://localhost:3000
npm run build   # production build into frontend/dist/
npm run preview # serve the production build locally
```

## Deployment (Vercel)

Set the project **Root Directory** to `frontend` (Framework Preset: Vite). Client-side routing is handled by `frontend/vercel.json`.
