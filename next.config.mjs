import dotenv from 'dotenv';
import webpack from 'webpack';

// ----------------------------------------------------------------------

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    MINIAPP_VALHOST: process.env.MINIAPP_VALHOST,
  },
  images: {
    domains: ['flagcdn.com'],
  },
};

export default nextConfig;
