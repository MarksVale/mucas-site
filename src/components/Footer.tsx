import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import WaveDivider from '@/components/WaveDivider'

export async function Footer() {
  const t = await getTranslations('footer')
  return (
    <>
      <WaveDivider variant="into-dark" />
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-brand">MUČAS</div>
              <p>{t('tagline')}</p>
            </div>
            <div className="footer-col">
              <h4>{t('rivers')}</h4>
              <Link href="/rivers">{t('allRivers')}</Link>
              <Link href={{ pathname: '/rivers/[slug]', params: { slug: 'gauja' } }}>Gauja</Link>
              <Link href={{ pathname: '/rivers/[slug]', params: { slug: 'salaca' } }}>Salaca</Link>
              <Link href={{ pathname: '/rivers/[slug]', params: { slug: 'brasla' } }}>Brasla</Link>
              <Link href={{ pathname: '/rivers/[slug]', params: { slug: 'amata' } }}>Amata</Link>
            </div>
            <div className="footer-col">
              <h4>{t('company')}</h4>
              <Link href="/about">{t('aboutUs')}</Link>
              <Link href="/contact">{t('contact')}</Link>
              <Link href="/fleet">{t('ourFleet')}</Link>
              <Link href="/booking">{t('bookNow')}</Link>
            </div>
            <div className="footer-col">
              <h4>{t('contact')}</h4>
              <a href="tel:+37129211634">+371 29 211 634</a>
              <a href="mailto:info@laivunoma.com">info@laivunoma.com</a>
              <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                SIA &ldquo;Mučas&rdquo;<br />
                Reģ. Nr.: LV40103263487<br />
                Jāņa Čakstes 1-41, Sigulda, LV-2150<br />
                A/S SEB banka UNLALV2X<br />
                IBAN: LV90UNLA0055005842535
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t('copyright')}</span>
            <span>{t('privacyPolicy')} &bull; {t('terms')}</span>
          </div>
        </div>
      </footer>
    </>
  )
}
