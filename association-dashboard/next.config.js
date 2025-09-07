/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  
  // API rewrites to BFF
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.ASSOCIATION_BFF_URL || 'http://localhost:3003'}/:path*`,
      },
    ];
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'Association Dashboard',
    NEXT_PUBLIC_API_URL: 'http://localhost:3003',
  },
  
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Output configuration for Docker
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: ['localhost', '127.0.0.1'],
  },
};

module.exports = nextConfig;
