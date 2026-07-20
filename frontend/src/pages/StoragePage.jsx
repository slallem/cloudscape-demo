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

const StoragePage = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Mock data for storage buckets
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

  const { items, filteredItemsCount, filterProps, paginationProps, collectionProps } = useCollection(allItems, {
    filtering: {
      empty: 'No buckets found',
      noMatch: 'No buckets match the filter',
    },
    pagination: { pageSize: 10 },
    sorting: {},
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
          Storage
        </Header>
        <Box variant="p">
          Object storage offering scalability, data availability, security, and performance for any amount of data.
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
        trackBy="name"
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        sortingColumn={collectionProps.sortingColumn}
        sortingDescending={collectionProps.sortingDescending}
        onSortingChange={collectionProps.onSortingChange}
        loading={false}
        loadingText="Loading buckets"
        filter={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Fixed width so the search box does NOT shrink when the count appears */}
            <div style={{ width: '300px' }}>
              <TextFilter
                {...filterProps}
                filteringPlaceholder="Find buckets"
              />
            </div>
            {/* Separate text added in the free space to the right */}
            <Box color="text-body-secondary">
              {filterProps.filteringText
                ? `${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`
                : ''}
            </Box>
          </div>
        }
        pagination={<Pagination {...paginationProps} />}
        header={
          <Header
            counter={
              selectedItems.length
                ? `(${selectedItems.length}/${allItems.length})`
                : `(${allItems.length})`
            }
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

export default StoragePage;