import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Cards from '@cloudscape-design/components/cards';
import Link from '@cloudscape-design/components/link';
import Button from '@cloudscape-design/components/button';
import Badge from '@cloudscape-design/components/badge';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const accountSummary = [
    { label: 'Running EC2 Instances', value: '4', status: 'success' },
    { label: 'S3 Buckets', value: '8', status: 'info' },
    { label: 'Monthly Spend', value: '$127.45', status: 'warning' },
  ];

  const recentlyVisitedItems = [
    { title: 'EC2 Instances', description: 'Manage your virtual servers', href: '/ec2' },
    { title: 'S3 Buckets', description: 'Manage your storage', href: '/s3' },
    { title: 'Lambda Functions', description: 'Manage your serverless functions', href: '/lambda' },
  ];

  const favoriteServices = [
    { title: 'EC2', description: 'Virtual servers in the cloud', href: '/ec2' },
    { title: 'S3', description: 'Scalable storage in the cloud', href: '/s3' },
    { title: 'Lambda', description: 'Run code without thinking about servers', href: '/lambda' },
    { title: 'DynamoDB', description: 'Managed NoSQL database', href: '/dynamodb' },
  ];

  return (
    <SpaceBetween size="l">
      <Container>
        <Header variant="h1">
          Welcome back, {user?.name}!
        </Header>
        <Box variant="p">
          Here's an overview of your AWeSome resources and services.
        </Box>
      </Container>

      <Container header={<Header variant="h2">Account Summary</Header>}>
        <ColumnLayout columns={3} variant="text-grid">
          {accountSummary.map((item, index) => (
            <div key={index}>
              <Box variant="h2" display="flex" alignItems="center">
                <Box marginRight="xs">{item.value}</Box>
                <Badge color={item.status}>{item.status}</Badge>
              </Box>
              <Box variant="p" color="text-body-secondary">{item.label}</Box>
            </div>
          ))}
        </ColumnLayout>
      </Container>

      <Container header={<Header variant="h2">Recently visited</Header>}>
        <ColumnLayout columns={3} variant="text-grid">
          {recentlyVisitedItems.map((item, index) => (
            <div key={index}>
              <Box variant="h3">
                <Link href={item.href}>{item.title}</Link>
              </Box>
              <Box variant="p">{item.description}</Box>
            </div>
          ))}
        </ColumnLayout>
      </Container>

      <Container header={<Header variant="h2">Favorite services</Header>}>
        <Cards
          cardDefinition={{
            header: item => (
              <Link href={item.href}>{item.title}</Link>
            ),
            sections: [
              {
                id: 'description',
                content: item => item.description
              },
              {
                id: 'actions',
                content: item => (
                  <Button href={item.href}>Open</Button>
                )
              }
            ]
          }}
          cardsPerRow={[
            { cards: 1 },
            { minWidth: 400, cards: 2 },
            { minWidth: 800, cards: 4 }
          ]}
          items={favoriteServices}
        />
      </Container>
    </SpaceBetween>
  );
};

export default Dashboard;