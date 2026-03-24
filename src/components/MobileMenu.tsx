'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { IconCart } from './Icons'

const STORE_URL = process.env.NEXT_PUBLIC_WC_STORE_URL || 'https://laivunoma.shop'

export default function MobileMenu({ brandName }: { brandName: string }) {
  const [open, setOpen] = useState(false)

  // Close menu on route change (clicking a link)
  const close = () => setOpen(false)

  // Prevent scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Mobile top bar */}
      <div className="mob-bar">
        <Link href="/" className="logo" onClick={close}>{brandName}</Link>
        <button className={`hamburger ${open ? 'hamburger-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Slide-out menu */}
      {open && <div className="mob-overlay" onClick={close} />}
      <nav className={`mob-nav ${open ? 'mob-nav-open' : ''}`}>
        <Link href="/" onClick={close}>Home</Link>
        <Link href="/rivers" onClick={close}>Rivers</Link>
        <Link href="/fleet" onClick={close}>Our Fleet</Link>
        <Link href="/about" onClick={close}>About</Link>
        <Link href="/contact" onClick={close}>Contact</Link>
        <Link href="/gallery" onClick={close}>Gallery</Link>
        <Link href="/blog" onClick={close}>Blog</Link>
        <a href={`${STORE_URL}/basket`} onClick={close} className="mob-cart">
          <IconCart size={16} strokeWidth={2} /> Cart
        </a>
        <Link href="/booking" className="mob-cta" onClick={close}>Book Now</Link>
      </nav>
    </>
  )
}
