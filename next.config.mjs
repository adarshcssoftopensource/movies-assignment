/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "movies-collection-production.netlify.app"],
  },
  env: {
    MONGODB_URI:
      "mongodb://localhost:27017/movies",
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
