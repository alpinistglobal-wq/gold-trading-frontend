export const metadata = {
  title: 'Alpinist v2.1 | Dual-Engine XAU/USD Terminal',
  description: 'Vercel Realtime Institutional Trading Dashboard & Alpinist Intelligence System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#030712', color: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
