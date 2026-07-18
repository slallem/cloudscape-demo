import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Table from '@cloudscape-design/components/table';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import BarChart from '@cloudscape-design/components/bar-chart';
import LineChart from '@cloudscape-design/components/line-chart';
import Button from '@cloudscape-design/components/button';
import Link from '@cloudscape-design/components/link';

// Minimal i18n strings shared by the charts
const chartI18n = {
  filterLabel: 'Filter displayed data',
  filterPlaceholder: 'Filter data',
  legendAriaLabel: 'Legend',
  chartAriaRoleDescription: 'chart',
  xTickFormatter: e => e,
  yTickFormatter: e => e.toString(),
};

const KpiCounter = ({ label, value, sub }) => (
  <div>
    <Box variant="awsui-key-label">{label}</Box>
    <Box fontSize="display-l" fontWeight="bold">{value}</Box>
    {sub && <Box variant="small" color="text-body-secondary">{sub}</Box>}
  </div>
);

const DashboardPage = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const instanceHours = [
    { title: 'Instance hours', type: 'bar', data: days.map((d, i) => ({ x: d, y: [120, 132, 101, 134, 90, 60, 72][i] })) },
  ];

  const networkTraffic = [
    { title: 'Inbound (GB)', type: 'line', data: days.map((d, i) => ({ x: d, y: [24, 31, 28, 40, 37, 22, 26][i] })) },
    { title: 'Outbound (GB)', type: 'line', data: days.map((d, i) => ({ x: d, y: [14, 18, 21, 25, 23, 12, 15][i] })) },
  ];

  const health = [
    { service: 'Servers', status: 'success', text: 'Operational' },
    { service: 'Storage', status: 'success', text: 'Operational' },
    { service: 'Serverless', status: 'warning', text: 'Degraded performance' },
    { service: 'Database', status: 'success', text: 'Operational' },
    { service: 'Networking', status: 'error', text: 'Service disruption' },
  ];

  const alarms = [
    { name: 'High CPU utilization', resource: 'i-1234567890abcdef0', state: 'error', time: '2 min ago' },
    { name: 'Disk space low', resource: 'vol-0a1b2c3d4e5f6', state: 'warning', time: '18 min ago' },
    { name: 'Latency spike', resource: 'api-gateway-prod', state: 'warning', time: '43 min ago' },
    { name: 'Healthy', resource: 'lb-frontend', state: 'success', time: '1 hr ago' },
  ];

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Overview of your service resources, health, and activity."
        actions={<Button iconName="refresh">Refresh</Button>}
      >
        Dashboard
      </Header>

      <Grid
        gridDefinition={[
          { colspan: { default: 12, m: 8 } },
          { colspan: { default: 12, m: 4 } },
          { colspan: { default: 12, m: 6 } },
          { colspan: { default: 12, m: 6 } },
          { colspan: { default: 12 } },
        ]}
      >
        {/* Service overview */}
        <Container header={<Header variant="h2">Service overview</Header>}>
          <ColumnLayout columns={4} variant="text-grid">
            <KpiCounter label="Running servers" value="24" sub="of 36 total" />
            <KpiCounter label="Storage buckets" value="8" sub="1.2 TB used" />
            <KpiCounter label="Serverless fns" value="15" sub="3 with errors" />
            <KpiCounter label="Monthly spend" value="$127" sub="+4% vs. last month" />
          </ColumnLayout>
        </Container>

        {/* Service health */}
        <Container header={<Header variant="h2">Service health</Header>}>
          <SpaceBetween size="s">
            {health.map(h => (
              <div key={h.service} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>{h.service}</Box>
                <StatusIndicator type={h.status}>{h.text}</StatusIndicator>
              </div>
            ))}
          </SpaceBetween>
        </Container>

        {/* Instance hours */}
        <Container header={<Header variant="h2">Instance hours</Header>}>
          <BarChart
            series={instanceHours}
            xDomain={days}
            yDomain={[0, 160]}
            xScaleType="categorical"
            height={240}
            xTitle="Day"
            yTitle="Hours"
            hideFilter
            ariaLabel="Instance hours per day"
            i18nStrings={chartI18n}
            empty={<Box textAlign="center" color="inherit">No data available</Box>}
          />
        </Container>

        {/* Network traffic */}
        <Container header={<Header variant="h2">Network traffic</Header>}>
          <LineChart
            series={networkTraffic}
            xDomain={days}
            yDomain={[0, 50]}
            xScaleType="categorical"
            height={240}
            xTitle="Day"
            yTitle="GB"
            ariaLabel="Network traffic per day"
            i18nStrings={chartI18n}
            empty={<Box textAlign="center" color="inherit">No data available</Box>}
          />
        </Container>

        {/* Alarms */}
        <Table
          variant="container"
          header={<Header variant="h2" counter={`(${alarms.length})`}>Recent alarms</Header>}
          columnDefinitions={[
            {
              id: 'name',
              header: 'Alarm',
              cell: item => <Link href="#">{item.name}</Link>,
            },
            {
              id: 'state',
              header: 'State',
              cell: item => <StatusIndicator type={item.state}>{item.state}</StatusIndicator>,
            },
            { id: 'resource', header: 'Resource', cell: item => item.resource },
            { id: 'time', header: 'Last updated', cell: item => item.time },
          ]}
          items={alarms}
        />
      </Grid>
    </SpaceBetween>
  );
};

export default DashboardPage;
