/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(new URL('.', import.meta.url).pathname), // Resolve '@' to the root directory of the project
    };
    return config;
  },
};

export default nextConfig;
