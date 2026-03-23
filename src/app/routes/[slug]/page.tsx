import Link from 'next/link'
import { getRoutes, getRoute, getRoutesByRiver, getBoats } from '@/lib/airtable'
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

const boatIcons: Record<string, string> = {
  Kayak: '🚣', Canoe: '🛶', SUP: '🏄', Raft: '🛟',
}

function getBoardIcon(category: string) {
  for (const [k, v] of Object.entries(boatIcons)) {
    if (category.toLowerCase().includes(k.toLowerCase())) return v
  }
  return '🚣'
}

export default async function RoutePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const route = await getRoute(slug)
  const allBoats = await getBoats()
  const content = getRouteContent(slug)

  if (!route) return <div className="container" style={{ padding: '80px 0' }}><h1>Route not found</h1></div>

  const availableBoats = allBoats.filter(b => route.boats.includes(b.name))
  const riverRoutes = await getRoutesByRiver(route.riverSlug)
  const relatedRoutes = riverRoutes.filter(r => r.slug !== slug).slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className={`route-hero ${route.gradient}`}>
        <div className="container">
          <div className="route-hero-inner">
            <p className="breadcrumb" style={{ marginBottom: 16 }}>
              <Link href="/rivers" style={{ color: 'rgba(255,255,255,0.7)' }}>Rivers</Link>
              {' → '}
              <Link href={`/rivers/${route.riverSlug}`} style={{ color: 'rgba(255,255,255,0.7)' }}>{route.river}</Link>
              {' → '}
              <span style={{ color: 'white' }}>{route.name}</span>
            </p>
            <h1>{route.name}</h1>
            {content.description && (
              <p className="route-hero-sub" style={{ maxWidth: 600, margin: '0 auto' }}>
                {content.description.split('. ').slice(0, 2).join('. ') + '.'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FLOATING STATS BAR */}
      <div className="floating-stats">
        <div className="floating-stats-inner">
          {content.km > 0 && (
            <div className="fstat">
              <div className="fstat-icon">📏</div>
              <div className="fstat-value">{content.km} km</div>
              <div className="fstat-label">Distance</div>
            </div>
          )}
          <div className="fstat">
            <div className="fstat-icon">⏱</div>
            <div className="fstat-value">{route.days} {route.days === 1 ? 'day' : 'days'}{content.hours ? ` · ${content.hours}h` : ''}</div>
            <div className="fstat-label">Duration</div>
          </div>
          {content.difficulty && (
            <div className="fstat">
              <div className="fstat-icon">📊</div>
              <div className="fstat-value">{content.difficulty}</div>
              <div className="fstat-label">Difficulty</div>
            </div>
          )}
          <div className="fstat">
            <div className="fstat-icon">🚌</div>
            <div className="fstat-value">{route.transportCost}€</div>
            <div className="fstat-label">Transport</div>
          </div>
          {availableBoats.length > 0 && (
            <div className="fstat">
              <div className="fstat-icon">🛶</div>
              <div className="fstat-value">from {Math.min(...availableBoats.map(b => b.pricePerDay))}€</div>
              <div className="fstat-label">Per day</div>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="page-content">

        {/* DESCRIPTION */}
        {content.description && (
          <div className="page-section">
            <h2 className="stitle"><span className="stitle-icon">🌊</span> About the Route</h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 800 }}>
              {content.description}
            </p>
          </div>
        )}

        {/* HIGHLIGHTS */}
        {content.highlights.length > 0 && (
          <div className="page-section">
            <h2 className="stitle"><span className="stitle-icon">⭐</span> What You&apos;ll See Along the Way</h2>
            <div className="hl-cards">
              {content.highlights.map((h, i) => (
                <div className="hl-card" key={i}>
                  <div className="hl-card-icon">{['🪨', '🌲', '🏰', '🦅', '🌊', '🗺️', '⛵', '🏕️'][i % 8]}</div>
                  <h4>{h}</h4>
                  <p>A highlight of this route — part of what makes the {route.river} special.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY */}
        <div className="page-section">
          <h2 className="stitle"><span className="stitle-icon">📷</span> Gallery</h2>
          <div className="photo-gallery">
            <div className="pg-item">🏞️</div>
            <div className="pg-item">🌿</div>
            <div className="pg-item">🚣</div>
            <div className="pg-item">🪨</div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10 }}>Photos coming soon — be the first to share yours!</p>
        </div>

        {/* AVAILABLE BOATS */}
        {availableBoats.length > 0 && (
          <div className="page-section">
            <h2 className="stitle"><span className="stitle-icon">🛶</span> Available Boats</h2>
            <div className="boats-grid">
              {availableBoats.map(b => (
                <div className="bcard" key={b.slug}>
                  <div className="bcard-icon">{getBoardIcon(b.category)}</div>
                  <h4>{b.name}</h4>
                  <div className="bcard-cap">{b.seats} {b.seats === 1 ? 'seat' : 'seats'} · {b.category}</div>
                  <div className="bcard-price">{b.pricePerDay}€ <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)' }}>/ day</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAP */}
        <div className="page-section">
          <h2 className="stitle"><span className="stitle-icon">🗺️</span> Map</h2>
          <div className="map-container">
            <span style={{ fontSize: 16, color: 'var(--text-muted)', fontWeight: 500 }}>Interactive map coming soon</span>
            <div className="map-overlay">
              <div className="map-point">
                <span className="map-dot start"></span>
                <strong>Start:</strong>&nbsp;{route.hub || route.river}
              </div>
              <div className="map-point">
                <span className="map-dot end"></span>
                <strong>Finish:</strong>&nbsp;{route.name.split('–').pop()?.trim() || route.river}
              </div>
            </div>
          </div>
        </div>

        {/* USEFUL INFO */}
        <div className="page-section">
          <h2 className="stitle"><span className="stitle-icon">ℹ️</span> Useful Information</h2>
          <div className="info-cards-grid">
            <div className="icard">
              <div className="icard-icon">📦</div>
              <div>
                <h4>Included in Price</h4>
                <p>Paddles, life jackets, waterproof dry bag, boat delivery and pickup</p>
              </div>
            </div>
            <div className="icard">
              <div className="icard-icon">🚌</div>
              <div>
                <h4>Transport</h4>
                <p>Transport cost: {route.transportCost}€. Boat delivery to start or pickup at finish.{route.hub ? ` Hub: ${route.hub}.` : ''}</p>
              </div>
            </div>
            <div className="icard">
              <div className="icard-icon">🌤️</div>
              <div>
                <h4>Best Time</h4>
                <p>May — September. Water levels are optimal during summer months.</p>
              </div>
            </div>
            <div className="icard">
              <div className="icard-icon">⚠️</div>
              <div>
                <h4>Notes</h4>
                <p>{content.difficulty === 'Hard' ? 'Prior paddling experience recommended.' : 'Suitable for beginners with basic fitness.'} Children from age 7.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="page-section">
          <div className="cta-banner">
            <h2>Book Your Adventure!</h2>
            <p>Choose a date, boat type, and quantity — we&apos;ll take care of the rest.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href={`/booking?route=${route.slug}`} className="btn btn-white">📅 Book This Route</Link>
              <Link href="/contact" className="btn btn-outline">📞 Ask a Question</Link>
            </div>
          </div>
        </div>

        {/* RELATED ROUTES */}
        {relatedRoutes.length > 0 && (
          <div className="page-section">
            <h2 className="stitle"><span className="stitle-icon">👉</span> Other {route.river} Routes</h2>
            <div className="related-3">
              {relatedRoutes.map(r => {
                const rc = getRouteContent(r.slug)
                return (
                  <Link href={`/routes/${r.slug}`} className="rel-card" key={r.slug}>
                    <div className="rel-img">🏞️</div>
                    <div className="rel-body">
                      <h4>{r.name}</h4>
                      <div className="rel-meta">
                        {rc.km > 0 && <span>{rc.km} km</span>}
                        <span>{r.days} {r.days === 1 ? 'day' : 'days'}</span>
                        {rc.difficulty && <span>{rc.difficulty}</span>}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </>
  )
}
