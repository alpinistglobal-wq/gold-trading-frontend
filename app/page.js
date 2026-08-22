'use client';

import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('../components/AlpinistDashboard'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#eab308' }}>
      Initialising Alpinist v2.1 Engine & Interactive Charts...
    </div>
  ),
});

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '16px' }}>
      <Dashboard />
    </main>
  );
}
