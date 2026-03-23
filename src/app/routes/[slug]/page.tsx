import Link from 'next/link'
import { getRoutes, getRoute, getBoats } from '@/lib/airtable'
import { getRouteContent } from '@/lib/content'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const routes = await getRoutes()
  return routes.map(r => ({ slug: r.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const route = await getRoute(slug)
  const content = getRouteContent(slug)
  if (!route) return { title: 'Route Not Found' }
  return {
    title: `${route.name} | ${route.river} River | Mučas Laivu Noma`,
    description: content.description || `${route.name} on the ${route.river} river. ${route.days}-day trip.`,
  }
}

const difficultyClass: Record<string, string> = {
  Easy: 'diff-easy',
  Medium: 'diff-medium',
  Hard: 'diff-hard',
}

export default async function RoutePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const route = await getRoute(slug)
  const allBoats = await getBoats()
  const content = getRouteContent(slug)

  if (!route) return <div className="container" style={{ padding: '80px 0' }}><h1>Route not found</h1></div>

  const availableBoats = allBoats.filter(b => route.boats.includes(b.name))

  return (
    <>
      {/* HERO */}
      <section className={`route-hero ${route.gradient}`}>
        <div className="container">
          <Link href={`/rivers/${route.riverSlug}`} className="breadcrumb">← {route.river} River</Link>
          {content.difficulty && (
            <span className={`diff-badge diff-${content.difficulty.toLowerCase()}`}>{content.difficulty}</span>
          )}
          <h1>{route.name}</h1>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">{route.days}</div><div className="lbl">{route.days === 1 ? 'day' : 'days'}</div></div>
            {content.km > 0 && <div className="hero-stat"><div className="num">{content.km}</div><div className="lbl">km</div></div>}
            {content.hours && <div className="hero-stat"><div className="num">{content.hours}</div><div className="lbl">hours</div></div>}
            <div className="hero-stat"><div className="num">{route.transportCost}€</div><div className="lbl">transport</div></div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section">
        <div className="container">
          <div className="route-grid">
            <div>
              {/* Description */}
              {content.description && (
                <>
                  <h2 style={{ fontSize: 26, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>About This Route</h2>
                  <p className="route-desc">{content.description}</p>
                </>
              )}

              {/* Highlights */}
              {content.highlights.length > 0 && (
                <div style={{ marginTop: 28 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Route Highlights</h3>
                  <div className="highlights-list">
                    {content.highlights.map((h, i) => <span className="highlight-tag" key={i}>{h}</span>)}
                  </div>
                </div>
              )}

              {/* Detail table */}
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Route Details</h3>
                <div className="detail-table">
                  <div className="detail-row"><span className="detail-label">River</span><span>{route.river}</span></div>
                  <div className="detail-row"><span className="detail-label">Duration</span><span>{route.days} {route.days === 1 ? 'day' : 'days'}{content.hours ? ` (${content.hours} hours on water)` : ''}</span></div>
                  {content.km > 0 && <div className="detail-row"><span className="detail-label">Distance</span><span>{content.km} km</span></div>}
                  {content.difficulty && <div className="detail-row"><span className="detail-label">Difficulty</span><span>{content.difficulty}</span></div>}
                  <div className="detail-row"><span className="detail-label">Starting Hub</span><span>{route.hub}</span></div>
                  <div className="detail-row"><span className="detail-label">Transport Cost</span><span>{route.transportCost}€</span></div>
                  {route.startTimes.length > 0 && <div className="detail-row"><span className="detail-label">Start Times</span><span>{route.startTimes.join(', ')}</span></div>}
                </div>
              </div>

              {/* Available boats */}
              {availableBoats.length > 0 && (
                <div style={{ marginTop: 32 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Available Boats</h3>
                  <div className="boat-options">
                    {availableBoats.map(b => (
                      <div className="boat-option" key={b.slug}>
                        <div className="boat-name">{b.name}</div>
                        <div className="boat-meta">{b.category} · {b.seats} {b.seats === 1 ? 'seat' : 'seats'}</div>
                        <div className="boat-price">{b.pricePerDay}€ <span>/ day</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map placeholder */}
              <div className="map-card" style={{ marginTop: 32 }}>
                <h4>Route Map</h4>
                <div className="map-placeholder">
                  <div style={{ fontSize: 32 }}>🗺️</div>
                  <p>Interactive map coming soon</p>
                  {route.hub && <p className="gps-text">Starting hub: {route.hub}</p>}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div>
              <div className="booking-card">
                <h3>Book This Route</h3>
                <p>Select your boat, date, and group size to get started.</p>
                <div className="detail-table" style={{ marginBottom: 20 }}>
                  {content.km > 0 && <div className="detail-row"><span className="detail-label">Distance</span><span>{content.km} km</span></div>}
                  <div className="detail-row"><span className="detail-label">Duration</span><span>{route.days} {route.days === 1 ? 'day' : 'days'}</span></div>
                  <div className="detail-row"><span className="detail-label">Transport</span><span>{route.transportCost}€</span></div>
                  {content.difficulty && <div className="detail-row"><span className="detail-label">Level</span><span>{content.difficulty}</span></div>}
                </div>
                <Link href={`/booking?route=${route.slug}`} className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                  Book Now
                </Link>
                <div style={{ textAlign: 'center', marginTop: 12 }}>
                  <Link href="/contact" style={{ fontSize: 13, color: 'var(--primary)' }}>Questions? Contact us →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section gray">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Paddle {route.name}?</h2>
            <p>Book now or browse more routes on the {route.river}.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href={`/booking?route=${route.slug}`} className="btn btn-white">Book This Route</Link>
              <Link href={`/rivers/${route.riverSlug}`} className="btn btn-outline">More {route.river} Routes</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
