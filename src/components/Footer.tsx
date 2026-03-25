import Link from 'next/link'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">MUČAS</div>
            <p>Boat rentals across 22 rivers in Latvia — from Vidzeme to Latgale.</p>
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
            <a href="tel:+37129211634">+371 29 211 634</a>
            <a href="mailto:info@laivunoma.com">info@laivunoma.com</a>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)' }}>Sigulda, Latvia</p>
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

