# AWS Console Clone with Cloudscape Design System

This project is a React application that mimics the look and feel of the AWS Management Console using the AWS Cloudscape Design System.

## Features

- AWS Console-like user interface
- Responsive design
- Mock implementations of popular AWS services (EC2, S3)
- Built with JavaScript for rapid development

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application

To start the development server:

```
npm start
```

or

```
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

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

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
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
- [React Documentation](https://reactjs.org/docs/getting-started.html)