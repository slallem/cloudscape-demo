import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import { useCollection } from '@cloudscape-design/collection-hooks';

const EC2Page: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // Mock data for EC2 instances
  const allItems = [
    {
      id: 'i-1234567890abcdef0',
      name: 'Web Server',
      instanceType: 't2.micro',
      state: 'running',
      az: 'us-east-1a',
      publicIp: '54.123.45.67',
      launchTime: '2023-01-15T12:30:00Z',
    },
    {
      id: 'i-0987654321fedcba0',
      name: 'Database Server',
      instanceType: 't2.small',
      state: 'stopped',
      az: 'us-east-1b',
      publicIp: '-',
      launchTime: '2023-01-10T08:15:00Z',
    },
    {
      id: 'i-abcdef1234567890',
      name: 'Application Server',
      instanceType: 't2.medium',
      state: 'running',
      az: 'us-east-1c',
      publicIp: '54.234.56.78',
      launchTime: '2023-01-20T14:45:00Z',
    },
    {
      id: 'i-fedcba0987654321',
      name: 'Load Balancer',
      instanceType: 't2.small',
      state: 'running',
      az: 'us-east-1a',
      publicIp: '54.345.67.89',
      launchTime: '2023-01-18T10:00:00Z',
    },
  ];

  const { items, filterProps, paginationProps } = useCollection(allItems, {
    filtering: {
      empty: 'No instances found',
      noMatch: 'No instances match the filter',
    },
    pagination: { pageSize: 10 },
    selection: {},
  });

  return (
    <SpaceBetween size="l">
      <Container>
        <Header
          variant="h1"
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button>Launch instance</Button>
              <Button disabled={selectedItems.length === 0}>Connect</Button>
              <Button disabled={selectedItems.length === 0}>Actions</Button>
            </SpaceBetween>
          }
        >
          EC2 Instances
        </Header>
        <Box variant="p">
          Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides secure, resizable compute capacity in the cloud.
        </Box>
      </Container>

      <Table
        columnDefinitions={[
          {
            id: 'name',
            header: 'Name',
            cell: item => item.name || '-',
            sortingField: 'name',
          },
          {
            id: 'id',
            header: 'Instance ID',
            cell: item => item.id,
            sortingField: 'id',
          },
          {
            id: 'instanceType',
            header: 'Instance type',
            cell: item => item.instanceType,
            sortingField: 'instanceType',
          },
          {
            id: 'state',
            header: 'State',
            cell: item => (
              <Box color={item.state === 'running' ? 'text-status-success' : 'text-status-error'}>
                {item.state}
              </Box>
            ),
            sortingField: 'state',
          },
          {
            id: 'az',
            header: 'Availability zone',
            cell: item => item.az,
            sortingField: 'az',
          },
          {
            id: 'publicIp',
            header: 'Public IPv4 address',
            cell: item => item.publicIp,
            sortingField: 'publicIp',
          },
        ]}
        items={items}
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        loading={false}
        loadingText="Loading instances"
        filter={
          <TextFilter
            {...filterProps}
            filteringPlaceholder="Find instances"
          />
        }
        pagination={<Pagination {...paginationProps} />}
        header={
          <Header
            counter={`(${allItems.length})`}
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button iconName="refresh" />
                <Button iconName="settings" />
              </SpaceBetween>
            }
          >
            Instances
          </Header>
        }
      />
    </SpaceBetween>
  );
};

export default EC2Page;