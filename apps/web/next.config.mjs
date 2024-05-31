/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
  rewrites: async () => [
    {
      source: "/python-api/:path*",
      destination: "http://localhost:8000/:path*",
    },
  ],
};

export default nextConfig;
