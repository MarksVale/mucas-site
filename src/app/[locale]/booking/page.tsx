import { getRoutes, getBoats, getBranches } from '@/lib/airtable'
import PageHero from '@/components/PageHero'
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
      <PageHero heading={c.heroHeading} subtitle={c.heroSubtitle} />

      <section className="section">
        <div className="container">
          <div className="booking-layout">

            {/* LEFT: Online Booking Form */}
            <div className="booking-form-col">
              <div className="booking-card">
                <h3>{t('startBooking')}</h3>
                <p style={{ color: '#666', marginBottom: 24 }}>{t('startBookingDesc')}</p>

                <form className="contact-form">
                  <div className="form-group">
                    <label>{t('route')}</label>
                    <select>
                      <option value="">{t('selectRoute')}</option>
                      {routes.map(r => (
                        <option key={r.slug} value={r.slug}>
                          {r.name} ({r.river} &bull; {r.days} {r.days === 1 ? t('day') : t('days')})
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
                          {b.name} ({b.seats} {b.seats === 1 ? t('seat') : t('seats')})
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

            {/* RIGHT: Regional Branches */}
            <div className="booking-branches-col">
              <div className="booking-card">
                <h3>{t('outsideVidzeme')}</h3>
                <p style={{ color: '#666', marginBottom: 20, fontSize: 15 }}>{t('outsideVidzemeDesc')}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {phoneBranches.map(b => (
                    <div key={b.slug} style={{ background: 'var(--tint)', borderRadius: 10, padding: '14px 16px' }}>
                      <div style={{ marginBottom: 10 }}>
                        <strong style={{ fontSize: 15 }}>{b.name}</strong>
                        {b.contactPerson && (
                          <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>{b.contactPerson}</div>
                        )}
                        {b.region && (
                          <div style={{ fontSize: 12, color: '#888', marginTop: 1 }}>{b.region}</div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {b.phone && (
                          <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="btn btn-primary" style={{ fontSize: 13, padding: '7px 14px' }}>
                            {t('call')} {b.phone}
                          </a>
                        )}
                        {b.email && (
                          <a href={`mailto:${b.email}`} className="btn" style={{ fontSize: 13, padding: '7px 14px', border: '1px solid var(--primary)', color: 'var(--primary)' }}>
                            {t('email')}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 16, fontSize: 13, color: '#888' }}>
                  <Link href="/rivers" style={{ color: 'var(--primary)' }}>{t('browseRivers')}</Link> {t('toFindTrip')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
