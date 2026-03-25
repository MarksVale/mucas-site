import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export', // Static export for Vercel
  images: {
    unoptimized: true, // Required for static export — Cloudinary handles its own optimization via q_auto,f_auto
  },
}

export default nextConfig
