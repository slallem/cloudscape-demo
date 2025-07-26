import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '@cloudscape-design/components/app-layout';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

// Pages
import Dashboard from './pages/Dashboard';
import EC2Page from './pages/EC2Page';
import S3Page from './pages/S3Page';
import NotFound from './pages/NotFound';
import {TopNavigationProps} from "@cloudscape-design/components/top-navigation/interfaces";
import {SideNavigationProps} from "@cloudscape-design/components/side-navigation/interfaces";

// Apply the light mode by default
applyMode(Mode.Light);

const App: React.FC = () => {
  const [navigationOpen, setNavigationOpen] = useState(true);

  const navItems : ReadonlyArray<SideNavigationProps.Item> = [
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

  const utilities: ReadonlyArray<TopNavigationProps.Utility> = [
    {
      type: "menu-dropdown",
      text: "User",
      iconName: "user-profile",
      items: [
        { id: "profile", text: "Profile" },
        { id: "preferences", text: "Preferences" },
        { id: "security", text: "Security" },
        { id: "signout", text: "Sign out" },
      ],
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
            alt: 'AWS',
          },
        }}
        utilities={utilities}
      />
      <AppLayout
        navigation={
          <SideNavigation
            activeHref={window.location.pathname}
            header={{ text: 'Services', href: '/' }}
            items={navItems}
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

export default App;