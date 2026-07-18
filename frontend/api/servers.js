// Vercel Serverless Function — GET /api/servers
// Returns a mocked list of server instances.
// Runs on-demand on Vercel's Node.js runtime (stateless, no persistent disk).

// A handful of named servers kept for readability at the top of the list...
const BASE_SERVERS = [
  { id: 'i-1234567890abcdef0', name: 'Web Server',         instanceType: 't2.micro',  state: 'running', az: 'us-east-1a', publicIp: '54.123.45.67', launchTime: '2023-01-15T12:30:00Z' },
  { id: 'i-0987654321fedcba0', name: 'Database Server',    instanceType: 't2.small',  state: 'stopped', az: 'us-east-1b', publicIp: '-',            launchTime: '2023-01-10T08:15:00Z' },
  { id: 'i-abcdef1234567890',  name: 'Application Server', instanceType: 't2.medium', state: 'running', az: 'us-east-1c', publicIp: '54.234.56.78', launchTime: '2023-01-20T14:45:00Z' },
  { id: 'i-fedcba0987654321',  name: 'Load Balancer',      instanceType: 't2.small',  state: 'running', az: 'us-east-1a', publicIp: '54.345.67.89', launchTime: '2023-01-18T10:00:00Z' },
  { id: 'i-0a1b2c3d4e5f60718', name: 'Cache Node',         instanceType: 't3.medium', state: 'running', az: 'us-east-1b', publicIp: '54.456.78.90', launchTime: '2023-02-02T09:05:00Z' },
  { id: 'i-192837465abcdef01', name: 'Batch Worker',       instanceType: 'c5.large',  state: 'pending', az: 'us-east-1c', publicIp: '-',            launchTime: '2023-02-11T16:40:00Z' },
  { id: 'i-0banana1234567890', name: 'Banana Server',      instanceType: 't3.small',  state: 'running', az: 'us-east-1a', publicIp: '54.567.89.01', launchTime: '2023-03-05T11:20:00Z' },
  { id: 'i-0cherry0987654321', name: 'Cherry Worker',      instanceType: 't3.large',  state: 'stopped', az: 'us-east-1b', publicIp: '-',            launchTime: '2023-03-12T07:55:00Z' },
];

// ...and the rest are generated deterministically so the demo has enough rows
// to exercise pagination (36 total → 4 pages of 10).
const TOTAL = 36;
const ROLES = ['Web Server', 'App Server', 'Worker Node', 'Cache Node', 'Proxy', 'DB Replica', 'API Node', 'Queue Worker'];
const TYPES = ['t2.micro', 't2.small', 't2.medium', 't3.small', 't3.medium', 't3.large', 'c5.large', 'm5.large'];
const STATES = ['running', 'running', 'running', 'stopped', 'pending']; // weighted toward running
const AZS = ['us-east-1a', 'us-east-1b', 'us-east-1c'];

function pad2(n) {
  return String(n).padStart(2, '0');
}

function generateServer(i) {
  const state = STATES[i % STATES.length];
  const day = pad2((i % 27) + 1);
  return {
    id: 'i-' + (i + 1).toString(16).padStart(17, '0'),
    name: `${ROLES[i % ROLES.length]} ${pad2(i + 1)}`,
    instanceType: TYPES[i % TYPES.length],
    state,
    az: AZS[i % AZS.length],
    publicIp: state === 'running' ? `54.${100 + i}.${(i * 7) % 256}.${(i * 13) % 256}` : '-',
    launchTime: `2023-04-${day}T${pad2(i % 24)}:00:00Z`,
  };
}

const SERVERS = [
  ...BASE_SERVERS,
  ...Array.from({ length: TOTAL - BASE_SERVERS.length }, (_, k) => generateServer(BASE_SERVERS.length + k)),
];

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  return res.status(200).json({ servers: SERVERS });
};
