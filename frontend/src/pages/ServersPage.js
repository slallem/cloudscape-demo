import React, { useState, useEffect, useCallback } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import Alert from '@cloudscape-design/components/alert';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import { useCollection } from '@cloudscape-design/collection-hooks';

const ServersPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch servers from the /api/servers serverless function
  const fetchServers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/servers');
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setAllItems(data.servers);
    } catch (err) {
      setError(err.message);
      setAllItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  const { items, filteredItemsCount, filterProps, paginationProps, collectionProps } = useCollection(allItems, {
    filtering: {
      empty: 'No servers found',
      noMatch: 'No servers match the filter',
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
              <Button>Launch server</Button>
              <Button disabled={selectedItems.length === 0}>Connect</Button>
              <Button disabled={selectedItems.length === 0}>Actions</Button>
            </SpaceBetween>
          }
        >
          Servers
        </Header>
        <Box variant="p">
          Provision and manage secure, resizable virtual servers in the cloud.
        </Box>
      </Container>

      {error && (
        <Alert
          type="error"
          header="Failed to load servers"
          action={<Button onClick={fetchServers}>Retry</Button>}
        >
          {error}
        </Alert>
      )}

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
        trackBy="id"
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        sortingColumn={collectionProps.sortingColumn}
        sortingDescending={collectionProps.sortingDescending}
        onSortingChange={collectionProps.onSortingChange}
        loading={loading}
        loadingText="Loading servers"
        filter={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Fixed width so the search box does NOT shrink when the count appears */}
            <div style={{ width: '300px' }}>
              <TextFilter
                {...filterProps}
                filteringPlaceholder="Find servers"
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
                <Button iconName="refresh" loading={loading} onClick={fetchServers} />
                <Button iconName="settings" />
              </SpaceBetween>
            }
          >
            Servers
          </Header>
        }
      />
    </SpaceBetween>
  );
};

export default ServersPage;