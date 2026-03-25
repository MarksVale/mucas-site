import Link from 'next/link'
import { getBranches } from '@/lib/airtable'

export async function Footer() {
  const branches = await getBranches()

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
            <h4>Filiāles / Branches</h4>
            {branches.map(b => (
              <div key={b.slug} style={{ marginBottom: 12, fontSize: 14 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{b.name}</p>
                <p style={{ margin: '4px 0', color: 'var(--text-secondary)' }}>{b.contactPerson}</p>
                <a href={`tel:${b.phone}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                  {b.phone}
                </a>
              </div>
            ))}
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
