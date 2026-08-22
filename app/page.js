'use client';

import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('../components/AlpinistDashboard'), {
  ssr: false,'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports to prevent SSR issues with charting libraries
const TradingDashboard = dynamic(() => import('../components/TradingDashboard'), {
  ssr: false,
  loading: () => <div style={{ color: '#f59e0b', padding: '40px', textAlign: 'center' }}>Loading Trading Workstation...</div>
});

const AlpinistDashboard = dynamic(() => import('../components/AlpinistDashboard'), {
  ssr: false,
  loading: () => <div style={{ color: '#eab308', padding: '40px', textAlign: 'center' }}>Loading Alpinist Intelligence v2.1...</div>
});

export default function Home() {
  const [activeView, setActiveView] = useState('alpinist');

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#030712', padding: '16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* GLOBAL VIEW SWITCHER */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 16px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '12px 20px', borderRadius: '10px', border: '1px solid #1e293b' }}>
        <div style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '15px' }}>
          GOLD TRADING TERMINAL <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>| Repository System Sync</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveView('alpinist')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: activeView === 'alpinist' ? '#eab308' : '#1e293b',
              color: activeView === 'alpinist' ? '#000' : '#94a3b8',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            ⚜️ Alpinist Engine v2.1
          </button>
          <button
            onClick={() => setActiveView('trading')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: activeView === 'trading' ? '#3b82f6' : '#1e293b',
              color: activeView === 'trading' ? '#fff' : '#94a3b8',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            📊 Technical Execution Desk
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE COMPONENT */}
      {activeView === 'alpinist' ? <AlpinistDashboard /> : <TradingDashboard />}
    </main>
  );
}
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
