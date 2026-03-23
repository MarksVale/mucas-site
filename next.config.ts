import type { NextConfig } from 'next'

// WordPress backend URL — set in Vercel env vars
// Once you create backend.laivunoma.shop pointing to your WP hosting, set this
const WP_BACKEND = process.env.WP_BACKEND_URL || 'https://backend.laivunoma.shop'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Cloudinary handles its own optimization via q_auto,f_auto
  },
  async rewrites() {
    return [
      // WooCommerce checkout, cart, account pages → proxied to WordPress
      { source: '/checkout', destination: `${WP_BACKEND}/checkout` },
      { source: '/checkout/:path*', destination: `${WP_BACKEND}/checkout/:path*` },
      { source: '/cart', destination: `${WP_BACKEND}/cart` },
      { source: '/cart/:path*', destination: `${WP_BACKEND}/cart/:path*` },
      { source: '/my-account', destination: `${WP_BACKEND}/my-account` },
      { source: '/my-account/:path*', destination: `${WP_BACKEND}/my-account/:path*` },
      // WooCommerce REST API (for Airtable-generated checkout links)
      { source: '/wp-json/:path*', destination: `${WP_BACKEND}/wp-json/:path*` },
      // WordPress admin (so you can still manage from the main domain)
      { source: '/wp-admin/:path*', destination: `${WP_BACKEND}/wp-admin/:path*` },
      { source: '/wp-login.php', destination: `${WP_BACKEND}/wp-login.php` },
      // WooCommerce assets (CSS/JS needed for checkout styling)
      { source: '/wp-content/:path*', destination: `${WP_BACKEND}/wp-content/:path*` },
      { source: '/wp-includes/:path*', destination: `${WP_BACKEND}/wp-includes/:path*` },
    ]
  },
}

export default nextConfig
