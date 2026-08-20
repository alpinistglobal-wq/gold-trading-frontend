/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://gold-trading-backend-production.up.railway.app/:path*'
      }
    ]
  }
}

module.exports = nextConfig
