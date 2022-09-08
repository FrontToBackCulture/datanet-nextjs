import dotenv from 'dotenv';
import webpack from 'webpack';

// ----------------------------------------------------------------------

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
  env: {
    DEV_API: 'http://localhost:3002s',
    PRODUCTION_API: 'https://zone-assets-api.vercel.app',
    GOOGLE_API: '',
  },
  images: {
    domains: ['flagcdn.com'],
  },
};

export default nextConfig;
