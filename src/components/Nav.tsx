import Link from 'next/link'
import { IconCart } from './Icons'
import { getSettings } from '@/lib/content'
import MobileMenu from './MobileMenu'

// WooCommerce store URL — set in Vercel env vars, falls back to laivunoma.shop
const STORE_URL = process.env.NEXT_PUBLIC_WC_STORE_URL || 'https://laivunoma.shop'

export async function Nav() {
  const settings = await getSettings()
  return (
    <>
      {/* Desktop nav — hidden on mobile */}
      <nav className="nav-transparent nav-desktop">
        <Link href="/" className="logo">{settings.brandName}</Link>
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

      {/* Mobile nav — hidden on desktop */}
      <div className="nav-mobile">
        <MobileMenu brandName={settings.brandName} />
      </div>
    </>
  )
}
