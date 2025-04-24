/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    experimental: {
      serverActions: {
        allowedOrigins: ["localhost:3001", "gtw32lpt-3001.asse.devtunnels.ms", "localhost:4000"],
      },
    },
}
  
export default nextConfig;
