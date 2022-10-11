// ----------------------------------------------------------------------

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['www.thinkval.com', 'localhost.com', 's3.ap-southeast-1.amazonaws.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
