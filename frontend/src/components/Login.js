import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Input from '@cloudscape-design/components/input';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Link from '@cloudscape-design/components/link';
import Alert from '@cloudscape-design/components/alert';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" padding="l">
      <Container style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <SpaceBetween size="l">
          <Header variant="h1">
            {isRegistering ? 'Create Account' : 'Sign In'}
          </Header>
          
          {error && (
            <Alert type="error" dismissible onDismiss={() => setError('')}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <SpaceBetween direction="vertical" size="l">
              {isRegistering && (
                <FormField label="Name">
                  <Input
                    value={name}
                    onChange={({ detail }) => setName(detail.value)}
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </FormField>
              )}

              <FormField label="Email">
                <Input
                  value={email}
                  onChange={({ detail }) => setEmail(detail.value)}
                  placeholder="Enter your email"
                  type="email"
                  disabled={loading}
                />
              </FormField>

              <FormField label="Password">
                <Input
                  value={password}
                  onChange={({ detail }) => setPassword(detail.value)}
                  placeholder="Enter your password"
                  type="password"
                  disabled={loading}
                />
              </FormField>

              <Button 
                variant="primary" 
                loading={loading}
                formAction="submit"
                fullWidth
              >
                {isRegistering ? 'Create Account' : 'Sign In'}
              </Button>

              <Box textAlign="center">
                <Link onFollow={toggleMode}>
                  {isRegistering 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Create one"}
                </Link>
              </Box>

              {!isRegistering && (
                <SpaceBetween direction="vertical" size="s">
                  <Box textAlign="center">
                    <Button 
                      onClick={async () => {
                        setEmail('demo@example.com');
                        setPassword('demo123');
                        setLoading(true);
                        try {
                          await login('demo@example.com', 'demo123');
                        } catch (err) {
                          setError(err.message);
                        } finally {
                          setLoading(false);
                        }
                      }}
                      disabled={loading}
                      variant="link"
                    >
                      Quick Demo Login
                    </Button>
                  </Box>
                  
                  <Box textAlign="center" color="text-body-secondary" fontSize="body-s">
                    <Box variant="p">Or use any email/password combination</Box>
                  </Box>
                </SpaceBetween>
              )}
            </SpaceBetween>
          </Form>
        </SpaceBetween>
      </Container>
    </Box>
  );
};

export default Login;