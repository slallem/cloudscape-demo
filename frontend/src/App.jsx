import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@cloudscape-design/components/app-layout';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import Spinner from '@cloudscape-design/components/spinner';
import Box from '@cloudscape-design/components/box';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import logo from './assets/logo.svg';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Welcome from './pages/Welcome';
import Overview from './pages/Overview';
import ServersPage from './pages/ServersPage';
import StoragePage from './pages/StoragePage';
import CardViewPage from './pages/CardViewPage';
import DashboardPage from './pages/DashboardPage';
import FormPage from './pages/FormPage';
import NotFound from './pages/NotFound';

// Theme (light/dark) with persistence across reloads
const THEME_KEY = 'cloudscape-demo-theme';
const getInitialMode = () =>
  localStorage.getItem(THEME_KEY) === 'light' ? Mode.Light : Mode.Dark;

// Apply the persisted mode on load (defaults to dark)
applyMode(getInitialMode());

// Authenticated App Layout
const AuthenticatedApp = () => {
  const [navigationOpen, setNavigationOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => getInitialMode() === Mode.Dark);

  const setMode = (dark) => {
    setDarkMode(dark);
    applyMode(dark ? Mode.Dark : Mode.Light);
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  };

  const navItems = [
    {
      type: 'section',
      text: 'Services',
      items: [
        { type: 'link', text: 'Overview', href: '/' },
        { type: 'link', text: 'Servers', href: '/servers' },
        { type: 'link', text: 'Storage', href: '/storage' },
      ],
    },
    {
      type: 'section',
      text: 'Showcase',
      items: [
        { type: 'link', text: 'Card view', href: '/card-view' },
        { type: 'link', text: 'Dashboard', href: '/dashboard' },
        { type: 'link', text: 'Form', href: '/form' },
      ],
    },
  ];

  const utilities = [
    {
      type: "menu-dropdown",
      text: user?.name || "User",
      iconName: "user-profile",
      items: [
        { id: "profile", text: "Profile" },
        { id: "preferences", text: "Preferences" },
        { id: "security", text: "Security" },
        { id: "signout", text: "Sign out" },
      ],
      onItemClick: ({ detail }) => {
        if (detail.id === 'signout') {
          logout();
        }
      }
    },
    {
      type: "menu-dropdown",
      text: "Settings",
      iconName: "settings",
      items: [
        { id: "light-mode", text: "Light mode", itemType: "checkbox", checked: !darkMode },
        { id: "dark-mode", text: "Dark mode", itemType: "checkbox", checked: darkMode },
      ],
      onItemClick: ({ detail }) => {
        if (detail.id === 'light-mode') {
          setMode(false);
        } else if (detail.id === 'dark-mode') {
          setMode(true);
        }
      },
    },
  ];

  return (
    <div>
      <TopNavigation
        identity={{
          href: '/',
          title: 'AWeSome Console Demo',
          logo: {
            src: logo,
            alt: 'AWeSome',
          },
        }}
        utilities={utilities}
      />
      <AppLayout
        navigation={
          <SideNavigation
            activeHref={location.pathname}
            header={{ text: 'Services', href: '/' }}
            items={navItems}
            onFollow={(event) => {
              if (!event.detail.external) {
                event.preventDefault();
                navigate(event.detail.href);
              }
            }}
          />
        }
        navigationOpen={navigationOpen}
        onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
        content={
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/servers" element={<ServersPage />} />
            <Route path="/storage" element={<StoragePage />} />
            <Route path="/card-view" element={<CardViewPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        }
        toolsHide={true}
      />
    </div>
  );
};

// Main App Component
const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="large" />
      </Box>
    );
  }

  return user ? <AuthenticatedApp /> : <Welcome />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;