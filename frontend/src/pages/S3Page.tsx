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

const S3Page: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // Mock data for S3 buckets
  const allItems = [
    {
      name: 'my-website-bucket',
      region: 'us-east-1',
      accessControl: 'Bucket owner enforced',
      created: '2023-01-10',
    },
    {
      name: 'app-assets-bucket',
      region: 'us-west-2',
      accessControl: 'Bucket owner enforced',
      created: '2023-02-15',
    },
    {
      name: 'data-analytics-bucket',
      region: 'eu-west-1',
      accessControl: 'Bucket owner enforced',
      created: '2023-03-20',
    },
    {
      name: 'backup-storage-bucket',
      region: 'us-east-1',
      accessControl: 'Bucket owner enforced',
      created: '2023-01-25',
    },
  ];

  const { items, filterProps, paginationProps } = useCollection(allItems, {
    filtering: {
      empty: 'No buckets found',
      noMatch: 'No buckets match the filter',
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
              <Button>Create bucket</Button>
              <Button disabled={selectedItems.length === 0}>Actions</Button>
            </SpaceBetween>
          }
        >
          S3 Buckets
        </Header>
        <Box variant="p">
          Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance.
        </Box>
      </Container>

      <Table
        columnDefinitions={[
          {
            id: 'name',
            header: 'Name',
            cell: item => item.name,
            sortingField: 'name',
          },
          {
            id: 'region',
            header: 'Region',
            cell: item => item.region,
            sortingField: 'region',
          },
          {
            id: 'accessControl',
            header: 'Access',
            cell: item => item.accessControl,
            sortingField: 'accessControl',
          },
          {
            id: 'created',
            header: 'Creation date',
            cell: item => item.created,
            sortingField: 'created',
          },
        ]}
        items={items}
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        loading={false}
        loadingText="Loading buckets"
        filter={
          <TextFilter
            {...filterProps}
            filteringPlaceholder="Find buckets"
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
            Buckets
          </Header>
        }
      />
    </SpaceBetween>
  );
};

export default S3Page;