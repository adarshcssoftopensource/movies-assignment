/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "movies-collection-production.netlify.app"],
  },
  env: {
    MONGODB_URI:
      "mongodb+srv://opensourcetech47:y70FR0xm0U0jPU8Q@cluster0.8tbvk.mongodb.net/movies",
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
