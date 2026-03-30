'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Pages with no dark hero — always show solid nav
const LIGHT_PATHS = [
  '/privacy', '/privatuma-politika',
  '/terms', '/noteikumi',
]

function pageNeedsLightNav(pathname: string): boolean {
  return LIGHT_PATHS.some(p =>
    pathname === p ||
    pathname === `/en${p}` ||
    pathname.startsWith(`${p}/`) ||
    pathname.startsWith(`/en${p}/`)
  )
}

export function NavShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 50)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  // Reset on navigation
  useEffect(() => {
    setScrolled(window.scrollY > 50)
  }, [pathname])

  const solid = pageNeedsLightNav(pathname) || scrolled

  return (
    <nav className={`nav-shell nav-desktop ${solid ? 'nav-shell--solid' : 'nav-shell--transparent'}`}>
      {children}
    </nav>
  )
}
