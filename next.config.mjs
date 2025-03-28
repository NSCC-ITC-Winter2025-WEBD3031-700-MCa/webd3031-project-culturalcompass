/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true, // This will ignore TypeScript errors during build
      },
};
 
export default nextConfig;