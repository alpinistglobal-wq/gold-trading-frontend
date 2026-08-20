'use client';

import dynamic from 'next/dynamic';

const TradingDashboard = dynamic(() => import('../components/TradingDashboard'), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#090d16', padding: '20px' }}>
      <TradingDashboard />
    </main>
  );
}
