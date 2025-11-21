import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@cloudscape-design/components/app-layout';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import Spinner from '@cloudscape-design/components/spinner';
import Box from '@cloudscape-design/components/box';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import EC2Page from './pages/EC2Page';
import S3Page from './pages/S3Page';
import NotFound from './pages/NotFound';

// Apply the light mode by default
applyMode(Mode.Light);

// Authenticated App Layout
const AuthenticatedApp = () => {
  const [navigationOpen, setNavigationOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    {
      type: 'section',
      text: 'Services',
      items: [
        { type: 'link', text: 'Dashboard', href: '/' },
        { type: 'link', text: 'EC2', href: '/ec2' },
        { type: 'link', text: 'S3', href: '/s3' },
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
        { id: "account", text: "Account settings" },
        { id: "security", text: "Security settings" },
        { id: "support", text: "Support" },
      ],
    },
  ];

  return (
    <div>
      <TopNavigation
        identity={{
          href: '/',
          title: 'My AWeSome Console',
          logo: {
            src: 'https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_stacked_REV_SQ.91cd4af40773cbfbd15577a3c2b8a346fe3e8fa2.png',
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/ec2" element={<EC2Page />} />
            <Route path="/s3" element={<S3Page />} />
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