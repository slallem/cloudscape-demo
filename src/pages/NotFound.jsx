import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <SpaceBetween size="l">
        <Header variant="h1">Page not found</Header>
        <Box variant="p">
          We can't find the page you're looking for. It might have been moved or deleted.
        </Box>
        <Box>
          <Button onClick={() => navigate('/')}>Go to dashboard</Button>
        </Box>
      </SpaceBetween>
    </Container>
  );
};

export default NotFound;