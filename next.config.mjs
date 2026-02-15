/** @type {import('next').NextConfig} */

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const url = new URL(backendUrl);

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "unsplash.com", "cdn.example.com"], //  Cloudinary domain added
    remotePatterns: [
      {
        protocol: "https",
        hostname: url.hostname,
        port: "", // optional, leave empty for default
        pathname: "/**", // allow all paths
      },
      {
        protocol: "https",
        hostname: "images.example.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // cloudinary 
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
