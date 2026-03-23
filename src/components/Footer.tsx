import Link from 'next/link'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">MUČAS</div>
            <p>Boat rentals across Latvia&apos;s rivers — Gauja, Salaca, Brasla, Amata.</p>
          </div>
          <div className="footer-col">
            <h4>Rivers</h4>
            <Link href="/rivers">All Rivers</Link>
            <Link href="/rivers/gauja">Gauja</Link>
            <Link href="/rivers/salaca">Salaca</Link>
            <Link href="/rivers/brasla">Brasla</Link>
            <Link href="/rivers/amata">Amata</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/fleet">Our Fleet</Link>
            <Link href="/booking">Book Now</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>+371 2X XXX XXX</p>
            <p>info@laivunoma.shop</p>
            <p>Sigulda, Latvia</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Mučas Laivu Noma</span>
          <span>Privacy Policy &bull; Terms</span>
        </div>
      </div>
    </footer>
  )
}
