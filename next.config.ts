import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/exstad",
  images: {
    // allow external images from these hosts (used in the project)

    domains: [
      "media.istockphoto.com",
      "encrypted-tbn0.gstatic.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "localhost:8080",
      "api.istad.co",
      "localhost",
      "api.exstad.tech",
    ],
  },
};

export default nextConfig;
