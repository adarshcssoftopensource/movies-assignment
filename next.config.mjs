/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "movies-collection-production"],
  },
  env: {
    MONGODB_URI:
      "mongodb+srv://opensourcetech47:y70FR0xm0U0jPU8Q@cluster0.8tbvk.mongodb.net/movies",
    NEXT_PUBLIC_BASE_URL: "https://movies-collection-production.netlify.app",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
