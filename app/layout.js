export const metadata = {
  title: 'Gold Trading Signals Dashboard',
  description: 'Live XAU/USD technical workstation and trade setups',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#090d16' }}>
        {children}
      </body>
    </html>
  );
}
