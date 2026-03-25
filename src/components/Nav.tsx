import Link from 'next/link'

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
        <Link href="/booking" className="nav-cta">Book Now</Link>
      </div>
    </nav>
  )
}
