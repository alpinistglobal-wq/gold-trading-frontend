export default function Home() {
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1>🏆 GOLD TRADING SIGNALS DASHBOARD</h1>
      <div style={{ fontSize: '24px', margin: '20px 0', color: '#0f0' }}>
        ✅ Dashboard is LIVE!
      </div>
      <p>Backend Status: Checking connection...</p>
      <p style={{ marginTop: '30px', color: '#999', fontSize: '12px' }}>
        Powered by gold-trading-backend-production.up.railway.app
      </p>
    </div>
  )
}
