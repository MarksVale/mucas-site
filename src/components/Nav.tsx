import Link from 'next/link'
import { IconCart } from './Icons'

// WooCommerce store URL — set in Vercel env vars, falls back to laivunoma.shop
const STORE_URL = process.env.NEXT_PUBLIC_WC_STORE_URL || 'https://laivunoma.shop'

export function Nav() {
  return (
    <nav className="nav-transparent">
      <Link href="/" className="logo">MUČAS</Link>
      <div className="menu">
        <Link href="/">Home</Link>
        <Link href="/rivers">Rivers</Link>
        <Link href="/fleet">Our Fleet</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/blog">Blog</Link>
        <a href={`${STORE_URL}/basket`} className="nav-cart" title="Cart">
          <IconCart size={18} strokeWidth={2} />
        </a>
        <Link href="/booking" className="nav-cta">Book Now</Link>
      </div>
    </nav>
  )
}
