import { getRoutes, getBoats, getBranches } from '@/lib/airtable'
import PageHero from '@/components/PageHero'
import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'
import { getBookingPage } from '@/lib/content'
import { getTranslations } from 'next-intl/server'
import { BookingFormClient } from '@/components/BookingFormClient'

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

  // Pass all translation strings to the client component
  const clientT = {
    startBooking:    t('startBooking'),
    startBookingDesc: t('startBookingDesc'),
    route:           t('route'),
    selectRoute:     t('selectRoute'),
    day:             t('day'),
    days:            t('days'),
    boatType:        t('boatType'),
    selectBoat:      t('selectBoat'),
    seat:            t('seat'),
    seats:           t('seats'),
    date:            t('date'),
    numBoats:        t('numBoats'),
    startTime:       t('startTime'),
    name:            t('name'),
    namePlaceholder: t('namePlaceholder'),
    email:           t('email'),
    phone:           t('phone'),
    notes:           t('notes'),
    notesPlaceholder: t('notesPlaceholder'),
    proceedCheckout: t('proceedCheckout'),
    securePayment:   t('securePayment'),
    waiverTitle:     t('waiverTitle'),
    waiverRules:     t.raw('waiverRules') as string[],
    waiverCheckbox:  t('waiverCheckbox'),
    waiverLink:      t('waiverLink'),
    termsLink:       t('termsLink'),
    submitting:      t('submitting'),
    successTitle:    t('successTitle'),
    successDesc:     t('successDesc'),
  }

  return (
    <>
      <PageHero heading={c.heroHeading} subtitle={c.heroSubtitle} />

      <section className="section">
        <div className="container">
          <div className="booking-layout">

            {/* LEFT: Regional Branches */}
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
                            {t('email2')}
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

            {/* RIGHT: Online Booking Form (client component handles interactivity + consent) */}
            <div className="booking-form-col">
              <BookingFormClient
                routes={routes}
                boats={boats}
                locale={locale}
                t={clientT}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
