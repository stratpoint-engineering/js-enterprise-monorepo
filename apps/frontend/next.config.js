/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@enterprise-monorepo/shared",
    "@enterprise-monorepo/ui-components",
    "@enterprise-monorepo/api-clients"
  ],
  experimental: {
    outputFileTracingRoot: '../../',
  },
  webpack: (config, { isServer }) => {
    // Add any custom webpack configuration here
    return config;
  },
  env: {
    // Base environment variables
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3001/api',
  },
  eslint: {
    dirs: ['src', 'lib', 'pages', 'components'],
  },
};

module.exports = nextConfig;
