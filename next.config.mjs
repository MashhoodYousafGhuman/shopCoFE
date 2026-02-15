/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["res.cloudinary.com", "unsplash.com", "cdn.example.com"], //  Cloudinary domain added
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "", // optional, leave empty for default
        pathname: "/**", // allow all paths
      },
      {
        protocol: "https",
        hostname: "images.example.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
