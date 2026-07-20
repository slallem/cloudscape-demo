import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Cards from '@cloudscape-design/components/cards';
import Badge from '@cloudscape-design/components/badge';
import Button from '@cloudscape-design/components/button';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Link from '@cloudscape-design/components/link';
import { useCollection } from '@cloudscape-design/collection-hooks';

const CardViewPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Mock data showcasing the Cards component
  const allItems = [
    { name: 'Analytics Pipeline', type: 'Data', status: 'running', owner: 'team-data', region: 'us-east-1' },
    { name: 'Payments API', type: 'Service', status: 'running', owner: 'team-payments', region: 'us-west-2' },
    { name: 'Image Processor', type: 'Batch', status: 'stopped', owner: 'team-media', region: 'eu-west-1' },
    { name: 'Notification Worker', type: 'Service', status: 'running', owner: 'team-core', region: 'us-east-1' },
    { name: 'Search Indexer', type: 'Batch', status: 'pending', owner: 'team-search', region: 'ap-south-1' },
    { name: 'Auth Gateway', type: 'Service', status: 'running', owner: 'team-security', region: 'us-east-1' },
    { name: 'Reporting Job', type: 'Batch', status: 'stopped', owner: 'team-data', region: 'eu-central-1' },
    { name: 'CDN Edge Cache', type: 'Infra', status: 'running', owner: 'team-platform', region: 'global' },
  ];

  const { items, filteredItemsCount, filterProps, paginationProps } = useCollection(allItems, {
    filtering: {
      empty: 'No items found',
      noMatch: 'No items match the filter',
    },
    pagination: { pageSize: 6 },
    selection: {},
  });

  const statusColor = (status) => {
    switch (status) {
      case 'running': return 'green';
      case 'stopped': return 'red';
      default: return 'blue';
    }
  };

  return (
    <SpaceBetween size="l">
      <Container>
        <Header
          variant="h1"
          description="A showcase of the Cloudscape Cards component with filtering, pagination, and selection."
        >
          Card view
        </Header>
        <Box variant="p">
          Cards present a collection of items in a responsive grid — a useful
          alternative to a table when each item benefits from more visual space.
        </Box>
      </Container>

      <Cards
        trackBy="name"
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        cardDefinition={{
          header: item => <Link fontSize="heading-m">{item.name}</Link>,
          sections: [
            {
              id: 'type',
              header: 'Type',
              content: item => item.type,
            },
            {
              id: 'status',
              header: 'Status',
              content: item => <Badge color={statusColor(item.status)}>{item.status}</Badge>,
            },
            {
              id: 'owner',
              header: 'Owner',
              content: item => item.owner,
            },
            {
              id: 'region',
              header: 'Region',
              content: item => item.region,
            },
          ],
        }}
        cardsPerRow={[
          { cards: 1 },
          { minWidth: 500, cards: 2 },
          { minWidth: 800, cards: 3 },
        ]}
        items={items}
        loadingText="Loading items"
        filter={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '300px' }}>
              <TextFilter {...filterProps} filteringPlaceholder="Find items" />
            </div>
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
            Items
          </Header>
        }
      />
    </SpaceBetween>
  );
};

export default CardViewPage;
