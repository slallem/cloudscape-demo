import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Cards from '@cloudscape-design/components/cards';
import Badge from '@cloudscape-design/components/badge';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import Link from '@cloudscape-design/components/link';
import Login from '../components/Login';

// Helper functions for service card colors
const getServiceColor = (title) => {
  switch (title) {
    case 'AWeSome Compute': return '#ec7211';
    case 'AWeSome Storage': return '#3f8624';
    case 'AWeSome Serverless': return '#ff9900';
    default: return '#232f3e';
  }
};

const getServiceColorDark = (title) => {
  switch (title) {
    case 'AWeSome Compute': return '#d65d0e';
    case 'AWeSome Storage': return '#2d5016';
    case 'AWeSome Serverless': return '#e87400';
    default: return '#161a20';
  }
};

const Welcome = () => {
  const [showLogin, setShowLogin] = useState(false);

  const awsServices = [
    {
      title: 'AWeSome Compute',
      description: 'Virtual servers in the cloud',
      icon: '🖥️',
      features: ['Scalable compute capacity', 'Multiple instance types', 'Secure and reliable']
    },
    {
      title: 'AWeSome Storage',
      description: 'Scalable object storage',
      icon: '💾',
      features: ['99.999999999% durability', 'Industry-leading performance', 'Comprehensive security']
    },
    {
      title: 'AWeSome Serverless',
      description: 'Run code without servers',
      icon: '⚡',
      features: ['No server management', 'Pay for what you use', 'Automatic scaling']
    },
  ];

  if (showLogin) {
    return <Login />;
  }

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
        utilities={[
          {
            type: "button",
            text: "Sign in",
            variant: "primary-button",
            onClick: () => setShowLogin(true)
          }
        ]}
      />
      <SpaceBetween size="l">
      {/* Hero Section with Custom Background */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #ff9a00 0%, #ff6b00 100%)',
          color: 'white',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem 2rem'
        }}
      >
        <SpaceBetween size="xl">
          <Box>
            <SpaceBetween size="l">
              <Box 
                fontSize="display-l" 
                fontWeight="bold"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  fontSize: '3.5rem',
                  lineHeight: '1.1'
                }}
              >
                Welcome to AWeSome
              </Box>
              <Box 
                fontSize="display-l" 
                fontWeight="bold"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  fontSize: '3.5rem',
                  lineHeight: '1.1',
                  background: 'linear-gradient(45deg, #ffffff, #f0f8ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Management Console
              </Box>
            </SpaceBetween>
          </Box>
          
          <Box fontSize="heading-l" style={{ opacity: 0.95 }}>
            Build, deploy, and manage your applications in the cloud
          </Box>
          
          <Box fontSize="body-l" style={{ opacity: 0.9, maxWidth: '600px' }}>
            Get started with AWeSome services and manage your cloud infrastructure 
            from a single, unified console. Experience the power of cloud computing.
          </Box>

          <Box display="flex" justifyContent="center" marginTop="xl">
            <SpaceBetween direction="horizontal" size="m">
              <Button 
                variant="primary" 
                size="large"
                onClick={() => setShowLogin(true)}
              >
                🚀 Get Started
              </Button>
              <Button 
                variant="normal"
                size="large"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </Button>
            </SpaceBetween>
          </Box>
        </SpaceBetween>
      </div>

      <div style={{ padding: '0 2rem', margin: '2rem 0' }}>
        <div style={{ 
          background: '#f8f9fa', 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          padding: '2rem',
          margin: '1rem 0'
        }}>
          <Box textAlign="center" padding="l">
            <Header variant="h1" style={{ color: '#232f3e', marginBottom: '8px' }}>
              Featured AWeSome Services
            </Header>
            <Box fontSize="body-l" color="text-body-secondary">
              Powerful tools to build, deploy, and scale your applications
            </Box>
          </Box>
          <Box padding="m">
          <Cards
            cardDefinition={{
              header: item => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    background: `linear-gradient(135deg, ${getServiceColor(item.title)}, ${getServiceColorDark(item.title)})`,
                    borderRadius: '8px 8px 0 0',
                    color: 'white',
                    marginBottom: '0px'
                  }}
                >
                  <span style={{ marginRight: '8px', fontSize: '1.5rem' }}>
                    {item.icon}
                  </span>
                  <h3 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>
                    {item.title}
                  </h3>
                </div>
              ),
              sections: [
                {
                  id: 'description',
                  content: item => (
                    <Box padding="s" style={{ background: '#ffffff' }}>
                      <Box variant="p" style={{ fontSize: '1.1rem', marginBottom: '12px' }}>
                        {item.description}
                      </Box>
                    </Box>
                  )
                },
                {
                  id: 'features',
                  content: item => (
                    <div style={{ padding: '8px', background: '#ffffff' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {item.features.map((feature, index) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <span 
                              style={{ 
                                marginRight: '8px',
                                color: '#16a34a', 
                                fontWeight: 'bold',
                                fontSize: '1.2rem'
                              }}
                            >
                              ✓
                            </span>
                            <span style={{ fontSize: '0.875rem' }}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  id: 'actions',
                  content: item => (
                    <Box padding="s" style={{ background: '#ffffff' }}>
                      <Button 
                        variant="primary" 
                        onClick={() => setShowLogin(true)}
                        fullWidth
                      >
                        Get Started
                      </Button>
                    </Box>
                  )
                }
              ]
            }}
            cardsPerRow={[
              { cards: 1 },
              { minWidth: 500, cards: 2 },
              { minWidth: 800, cards: 3 }
            ]}
            items={awsServices}
          />
          </Box>
        </div>
      </div>

      <div style={{ padding: '0 2rem', margin: '2rem 0' }}>
      <Container style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <ColumnLayout columns={2} variant="text-grid">
          <div>
            <SpaceBetween size="m">
              <Header variant="h3">Why Choose AWeSome?</Header>
              <Box variant="p">
                AWeSome offers reliable, scalable, and inexpensive cloud computing services. 
                With over 200 fully featured services, AWeSome helps you lower costs, 
                become more agile, and innovate faster.
              </Box>
              <SpaceBetween direction="vertical" size="xs">
                <Box display="flex" alignItems="center">
                  <Badge color="green">Reliable</Badge>
                  <Box marginLeft="xs">99.99% uptime SLA</Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Badge color="blue">Secure</Badge>
                  <Box marginLeft="xs">Enterprise-grade security</Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Badge color="grey">Global</Badge>
                  <Box marginLeft="xs">Available in 32 regions worldwide</Box>
                </Box>
              </SpaceBetween>
            </SpaceBetween>
          </div>
          <div>
            <SpaceBetween size="m">
              <Header variant="h3">Get Started Today</Header>
              <Box variant="p">
                Sign up for a free AWeSome account and start building with our 
                comprehensive suite of cloud services. No upfront costs, 
                pay only for what you use.
              </Box>
              <Button 
                variant="primary"
                onClick={() => setShowLogin(true)}
              >
                Create Free Account
              </Button>
            </SpaceBetween>
          </div>
        </ColumnLayout>
      </Container>
      </div>
    </SpaceBetween>

    {/* Footer Section */}
    <footer 
      style={{
        background: '#232f3e',
        color: '#ffffff',
        padding: '3rem 2rem 2rem 2rem',
        marginTop: '3rem'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', color: '#ffffff' }}>
        <ColumnLayout columns={4} variant="text-grid">
          <div>
            <SpaceBetween size="m">
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '0 0 1rem 0' }}>
                Resources
              </h3>
              <SpaceBetween direction="vertical" size="xs">
                <a href="/documentation" style={{ color: '#ffffff', textDecoration: 'none' }}>Documentation</a>
                <a href="/tutorials" style={{ color: '#ffffff', textDecoration: 'none' }}>Tutorials</a>
                <a href="/api-reference" style={{ color: '#ffffff', textDecoration: 'none' }}>API Reference</a>
                <a href="/community" style={{ color: '#ffffff', textDecoration: 'none' }}>Community</a>
                <a href="/blog" style={{ color: '#ffffff', textDecoration: 'none' }}>Blog</a>
                <a href="/whitepapers" style={{ color: '#ffffff', textDecoration: 'none' }}>Whitepapers</a>
              </SpaceBetween>
            </SpaceBetween>
          </div>
          <div>
            <SpaceBetween size="m">
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '0 0 1rem 0' }}>
                Support & Help
              </h3>
              <SpaceBetween direction="vertical" size="xs">
                <a href="/help" style={{ color: '#ffffff', textDecoration: 'none' }}>Help Center</a>
                <a href="/contact" style={{ color: '#ffffff', textDecoration: 'none' }}>Contact Us</a>
                <a href="/support" style={{ color: '#ffffff', textDecoration: 'none' }}>Technical Support</a>
                <a href="/training" style={{ color: '#ffffff', textDecoration: 'none' }}>Training</a>
                <a href="/certification" style={{ color: '#ffffff', textDecoration: 'none' }}>Certification</a>
                <a href="/forums" style={{ color: '#ffffff', textDecoration: 'none' }}>Forums</a>
              </SpaceBetween>
            </SpaceBetween>
          </div>
          <div>
            <SpaceBetween size="m">
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '0 0 1rem 0' }}>
                Company
              </h3>
              <SpaceBetween direction="vertical" size="xs">
                <a href="/about" style={{ color: '#ffffff', textDecoration: 'none' }}>About Us</a>
                <a href="/careers" style={{ color: '#ffffff', textDecoration: 'none' }}>Careers</a>
                <a href="/news" style={{ color: '#ffffff', textDecoration: 'none' }}>News</a>
                <a href="/events" style={{ color: '#ffffff', textDecoration: 'none' }}>Events</a>
                <a href="/partners" style={{ color: '#ffffff', textDecoration: 'none' }}>Partners</a>
                <a href="/investors" style={{ color: '#ffffff', textDecoration: 'none' }}>Investors</a>
              </SpaceBetween>
            </SpaceBetween>
          </div>
          <div>
            <SpaceBetween size="m">
              <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '0 0 1rem 0' }}>
                Legal
              </h3>
              <SpaceBetween direction="vertical" size="xs">
                <a href="/privacy" style={{ color: '#ffffff', textDecoration: 'none' }}>Privacy Policy</a>
                <a href="/terms" style={{ color: '#ffffff', textDecoration: 'none' }}>Terms of Service</a>
                <a href="/cookies" style={{ color: '#ffffff', textDecoration: 'none' }}>Cookie Policy</a>
                <a href="/compliance" style={{ color: '#ffffff', textDecoration: 'none' }}>Compliance</a>
                <a href="/security" style={{ color: '#ffffff', textDecoration: 'none' }}>Security</a>
                <a href="/accessibility" style={{ color: '#ffffff', textDecoration: 'none' }}>Accessibility</a>
              </SpaceBetween>
            </SpaceBetween>
          </div>
        </ColumnLayout>

        <Box 
          style={{ 
            borderTop: '1px solid #4b5563', 
            marginTop: '3rem', 
            paddingTop: '2rem',
            textAlign: 'center'
          }}
        >
          <SpaceBetween size="s">
            <div style={{ color: '#d1d5db', fontSize: '0.875rem', marginTop: '1rem', marginBottom: '1rem' }}>
              © 2024 AWeSome, Inc. All rights reserved.
            </div>
            <SpaceBetween direction="horizontal" size="l">
              <a href="/privacy" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none' }}>Privacy</a>
              <a href="/terms" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none' }}>Terms</a>
              <a href="/cookies" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none' }}>Cookies</a>
              <a href="/sitemap" style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none' }}>Sitemap</a>
            </SpaceBetween>
          </SpaceBetween>
        </Box>
      </div>
    </footer>
    </div>
  );
};

export default Welcome;