import dynamic from 'next/dynamic';

// Dynamically import the dashboard with SSR disabled for browser charts
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
