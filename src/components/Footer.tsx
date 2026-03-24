import Link from 'next/link'
import { getSettings } from '@/lib/content'

export async function Footer() {
  const settings = await getSettings()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">{settings.brandName}</div>
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
            <Link href="/gallery">Gallery</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p><a href={`tel:${settings.phone.replace(/\s/g, '')}`}>{settings.phone}</a></p>
            <p className="footer-note">Mon&ndash;Sat, 9:00&ndash;18:00</p>
            <p><a href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`}>WhatsApp</a></p>
            <p><a href={`mailto:${settings.email}`}>{settings.email}</a></p>
            {settings.address && (
              <>
                <p style={{ marginTop: 12 }}>{settings.address.split(',')[0]}</p>
                <p>{settings.address.split(',').slice(1).join(',').trim()}</p>
              </>
            )}
            <p className="footer-note">Gauja National Park area</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} SIA &ldquo;Mučas&rdquo; &middot; {settings.brandName} Laivu Noma</span>
          <span>Privacy Policy &bull; Terms</span>
        </div>
      </div>
    </footer>
  )
}
