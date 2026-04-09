import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.openstreetmap.org; font-src 'self'; connect-src 'self' http://localhost:3001 https://*.vercel.app https://nominatim.openstreetmap.org;",
          },
        ],
      },
    ]
  },
};

export default nextConfig;

