import Link from 'next/link'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">MUČAS</div>
            <p>Boat rentals across Latvia&apos;s rivers — Gauja, Salaca, Brasla, Amata.</p>
            <div className="footer-business">
              <p><strong>SIA &ldquo;Mučas&rdquo;</strong></p>
              <p>Reģ. Nr.: LV40103263487</p>
              <p>A/S SEB banka &middot; UNLALV2X</p>
              <p>IBAN: LV90UNLA0055005842535</p>
            </div>
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
            <p><a href="tel:+37129211634">+371 29211634</a></p>
            <p className="footer-note">Mon&ndash;Sat, 9:00&ndash;18:00</p>
            <p><a href="https://wa.me/37129211634">WhatsApp</a></p>
            <p><a href="mailto:info@laivunoma.com">info@laivunoma.com</a></p>
            <p style={{ marginTop: 12 }}>Jāņa Čakstes 1-41</p>
            <p>Sigulda, LV-2150</p>
            <p className="footer-note">Gauja National Park area</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} SIA &ldquo;Mučas&rdquo; &middot; Mučas Laivu Noma</span>
          <span>Privacy Policy &bull; Terms</span>
        </div>
      </div>
    </footer>
  )
}
