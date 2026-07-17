# cloudscape-demo

A sample app made with [Cloudscape](https://cloudscape.design/) (AWS console UI framework).

The application lives in the [`frontend/`](./frontend) directory. See [`frontend/README.md`](./frontend/README.md) for full documentation.

## Main versions

- React / React DOM 18.3.1
- React Router (`react-router-dom`) 6.30.4
- Cloudscape Components 3.0.1330 · Global Styles 1.0.62
- Create React App (`react-scripts`) 5.0.1

## Quick start

```bash
cd frontend
npm install     # install dependencies
npm start       # run dev server at http://localhost:3000
npm run build   # production build into frontend/build/
```

## Deployment (Vercel)

Set the project **Root Directory** to `frontend` (Framework Preset: Create React App). Client-side routing is handled by `frontend/vercel.json`.
