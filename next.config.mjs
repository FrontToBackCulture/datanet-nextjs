import dotenv from 'dotenv';
import webpack from 'webpack';

// ----------------------------------------------------------------------

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    DEV_API: 'http://localhost:3002',
    PRODUCTION_API: 'https://zone-assets-api.vercel.app',
    GOOGLE_API: '',
    MINIAPP_VALHOST: process.env.MINIAPP_VALHOST,
  },
  images: {
    domains: ['flagcdn.com'],
  },
};

export default nextConfig;
