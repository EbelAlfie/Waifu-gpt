/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    experimental: {
      serverActions: {
        allowedOrigins: ["localhost:3000", "gtw32lpt-3000.asse.devtunnels.ms"],
      },
    },
}
  
export default nextConfig;
