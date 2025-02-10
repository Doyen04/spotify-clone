import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "wwpngiozqmnecwavgloo.supabase.co",
        pathname: "/storage/v1/object/public/images/**"
      }
    ]
  }
};

export default nextConfig;
