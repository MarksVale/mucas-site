import { getRoutes, getBoats, getBranches } from '@/lib/airtable'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'
import { getBookingPage } from '@/lib/content'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isLv = locale !== 'en'
  const title = isLv ? `Rezervēt Braucienu | ${SITE_NAME}` : `Book Your Trip | ${SITE_NAME}`
  const description = isLv
    ? "Rezervē kajaku, kanoe vai plosta braucienu Latvijas upēs. Izvēlies maršrutu, ņem laivu un dodies uz ūdens."
    : "Book a kayak, canoe, or raft trip on Latvia's rivers. Choose your route, pick a boat, and hit the water."
  return {
    title, description,
    alternates: buildAlternates('/booking'),
    openGraph: buildOpenGraph({ locale, title, description, path: '/booking' }),
    twitter: twitterCard,
  }
}

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [routes, boats, allBranches, c, t] = await Promise.all([
    getRoutes(),
    getBoats(),
    getBranches(),
    getBookingPage(locale),
    getTranslations('booking'),
  ])
  const phoneBranches = allBranches.filter(b => b.bookingType === 'phone')

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{c.heroHeading}</h1>
          <p>{c.heroSubtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="booking-card" style={{ maxWidth: 640, margin: '0 auto' }}>
            <h3>{t('startBooking')}</h3>
            <p style={{ color: '#666', marginBottom: 24 }}>{t('startBookingDesc')}</p>

            <form className="contact-form">
              <div className="form-group">
                <label>{t('route')}</label>
                <select>
                  <option value="">{t('selectRoute')}</option>
                  {routes.map(r => (
                    <option key={r.slug} value={r.slug}>
                      {r.name} ({r.river} &bull; {r.days} {r.days === 1 ? t('day') : t('days')} &bull; {t('transport')}: {r.transportCost}€)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t('boatType')}</label>
                <select>
                  <option value="">{t('selectBoat')}</option>
                  {boats.map(b => (
                    <option key={b.slug} value={b.slug}>
                      {b.name} ({b.seats} {b.seats === 1 ? t('seat') : t('seats')} — {b.pricePerDay}€/{t('day')})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label>{t('date')}</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>{t('numBoats')}</label>
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>{t('startTime')}</label>
                <select>
                  <option>9:00</option>
                  <option>11:00</option>
                  <option>13:00</option>
                  <option>15:00</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t('name')}</label>
                <input type="text" placeholder={t('namePlaceholder')} />
              </div>
              <div className="form-group">
                <label>{t('email')}</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>{t('phone')}</label>
                <input type="tel" placeholder="+371..." />
              </div>
              <div className="form-group">
                <label>{t('notes')}</label>
                <textarea rows={3} placeholder={t('notesPlaceholder')} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: 18, padding: '16px 32px' }}>
                {t('proceedCheckout')}
              </button>
              <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 12 }}>
                {t('securePayment')}
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white-smoke)' }}>
        <div className="container" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ marginBottom: 8 }}>{t('outsideVidzeme')}</h3>
          <p style={{ color: '#666', marginBottom: 24, fontSize: 15 }}>{t('outsideVidzemeDesc')}</p>
          <div style={{ display: 'grid', gap: 16 }}>
            {phoneBranches.map(b => (
              <div key={b.slug} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ textAlign: 'left' }}>
                  <strong>{b.name}</strong>
                  <div style={{ fontSize: 14, color: '#666' }}>{b.contactPerson}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href={`tel:${b.phone}`} className="btn btn-primary" style={{ fontSize: 14, padding: '8px 16px' }}>
                    {t('call')} {b.phone}
                  </a>
                  <a href={`mailto:${b.email}`} className="btn" style={{ fontSize: 14, padding: '8px 16px', border: '1px solid var(--primary)', color: 'var(--primary)' }}>
                    {t('email')}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: '#888' }}>
            <Link href="/rivers" style={{ color: 'var(--primary)' }}>{t('browseRivers')}</Link> {t('toFindTrip')}
          </p>
        </div>
      </section>
    </>
  )
}
