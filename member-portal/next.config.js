/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  
  // API proxying is handled by Next.js API routes in /app/api/
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'Member Portal',
    NEXT_PUBLIC_API_URL: 'http://localhost:3001',
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
