import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Cloudinary handles its own optimization via q_auto,f_auto
  },
  // Environment variable WC_STORE_URL (default: https://laivunoma.shop) is used
  // in components to link to WooCommerce cart/checkout/account pages.
  // No rewrites needed — two separate domains, same styling.
}

export default nextConfig
