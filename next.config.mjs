// ----------------------------------------------------------------------

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    DEV_API: 'http://localhost:3002',
    PRODUCTION_API: 'https://zone-assets-api.vercel.app',
    GOOGLE_API: '',
  },
  images: {
    domains: ['www.thinkval.com', 'localhost.com', 's3.ap-southeast-1.amazonaws.com'],
  },
};

export default nextConfig;
