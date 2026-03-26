import Link from 'next/link'
import { getRoute, getRoutes, getRoutesByRiver, getBoats } from '@/lib/airtable'
import { getRouteContent } from '@/lib/content'
import { cldHero, cldGallery, cldBoat, CLD_BOAT_FALLBACK } from '@/lib/cloudinary'
import PhotoCarousel from '@/components/PhotoCarousel'
import BoatPhoto from '@/components/BoatPhoto'
import { BoatIcon } from '@/components/Icons'
import RouteMap from '@/components/RouteMap'
import {
  IconDistance, IconDuration, IconDifficulty,
  IconHighlight, IconGallery, IconInfo,
  IconIncluded, IconTransport, IconSeason, IconNote,
  IconMap, IconRoute
} from '@/components/Icons'
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

export default async function RoutePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const route = await getRoute(slug)

  if (!route) return <div className="container" style={{ padding: '80px 0' }}><h1>Route not found</h1></div>

  const allBoats = await getBoats()
  const availableBoats = allBoats.filter(b => route.boats.includes(b.name))

  const riverRoutes = await getRoutesByRiver(route.riverSlug)
  const relatedRoutes = riverRoutes.filter(r => r.slug !== slug).slice(0, 3)

  const content = getRouteContent(slug)
  const topHighlights = content.highlights.slice(0, 3)
  const galleryCount = Math.max(content.galleryCount ?? 0, 3)

  // Duration display: hours only if 1 day, days count if multi-day
  const durationDisplay = route.days === 1 && content.hours
    ? content.hours + 'h'
    : `${route.days} days`

  return (
    <>
      {/* HERO */}
      <section
        className={`route-hero ${route.gradient} route-hero-photo`}
        style={{ backgroundImage: `url(${cldHero('routes', slug)})` }}
      >
        <div className="hero-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
              <div className="fstat-icon"><IconDistance size={24} strokeWidth={1.6} /></div>
              <div className="fstat-value">{content.km} km</div>
              <div className="fstat-label">Distance</div>
            </div>
          )}
          <div className="fstat">
            <div className="fstat-icon"><IconDuration size={24} strokeWidth={1.6} /></div>
            <div className="fstat-value">{durationDisplay}</div>
            <div className="fstat-label">Duration</div>
          </div>
          {content.difficulty && (
            <div className="fstat">
              <div className="fstat-icon"><IconDifficulty size={24} strokeWidth={1.6} /></div>
              <div className="fstat-value">{content.difficulty}</div>
              <div className="fstat-label">Difficulty</div>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="page-content">

        {/* DESCRIPTION */}
        {content.description && (
          <div className="page-section">
            <h2 className="stitle">
              <span className="stitle-icon"><IconRoute size={22} strokeWidth={1.8} /></span>
              About the Route
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 800 }}>
              {content.description}
            </p>
          </div>
        )}

        {/* HIGHLIGHTS — max 3 */}
        {topHighlights.length > 0 && (
          <div className="page-section">
            <h2 className="stitle">
              <span className="stitle-icon"><IconHighlight size={22} strokeWidth={1.8} /></span>
              What You&apos;ll See Along the Way
            </h2>
            <div className="hl-cards">
              {topHighlights.map((h, i) => (
                <div className="hl-card" key={i}>
                  <div className="hl-card-icon"><IconHighlight size={26} strokeWidth={1.6} style={{ color: 'var(--primary)' }} /></div>
                  <h4>{h.name}</h4>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, margin: '6px 0 0' }}>{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY */}
        <div className="page-section">
          <h2 className="stitle">
            <span className="stitle-icon"><IconGallery size={22} strokeWidth={1.8} /></span>
            Gallery
          </h2>
          <PhotoCarousel
            images={Array.from({ length: galleryCount }, (_, i) => cldGallery('routes', slug, i + 1))}
            alt={route.name}
          />
        </div>

        {/* AVAILABLE BOATS */}
        {availableBoats.length > 0 && (
          <div className="page-section">
            <h2 className="stitle">
              <span className="stitle-icon"><IconRoute size={22} strokeWidth={1.8} /></span>
              Available Boats
            </h2>
            <div className="boats-grid">
              {availableBoats.map(b => (
                <div className="bcard" key={b.slug}>
                  <div className="bcard-photo">
                    <BoatPhoto
                      src={cldBoat(b.slug)}
                      fallback={CLD_BOAT_FALLBACK}
                      alt={b.name}
                    />
                  </div>
                  <div className="bcard-body">
                    <div className="bcard-icon">
                      <BoatIcon category={b.category} size={18} />
                    </div>
                    <h4>{b.name}</h4>
                    <div className="bcard-cap">{b.seats} {b.seats === 1 ? 'seat' : 'seats'} · {b.category}</div>
                    <div className="bcard-price">
                      {b.pricePerDay}€
                      <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)' }}> / day</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAP */}
        <div className="page-section">
          <h2 className="stitle">
            <span className="stitle-icon"><IconMap size={22} strokeWidth={1.8} /></span>
            Map
          </h2>
          {content.startLat && content.startLng && content.endLat && content.endLng ? (
            <div className="map-container map-container-live">
              <RouteMap
                startLat={content.startLat!}
                startLng={content.startLng!}
                endLat={content.endLat!}
                endLng={content.endLng!}
                label={route.name}
                riverSlug={route.riverSlug}
              />
              <div className="map-legend">
                <div className="map-point">
                  <span className="map-dot start"></span>
                  <span>Start: {route.name.split('–')[0]?.trim() || route.river}</span>
                </div>
                <div className="map-point">
                  <span className="map-dot end"></span>
                  <span>Finish: {route.name.split('–').pop()?.trim() || route.river}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="map-container">
              <div style={{ textAlign: 'center' }}>
                <IconMap size={40} strokeWidth={1.2} style={{ color: 'var(--text-muted)', marginBottom: 10 }} />
                <p style={{ fontSize: 15, color: 'var(--text-muted)', fontWeight: 500 }}>Map coming soon</p>
              </div>
            </div>
          )}
        </div>

        {/* USEFUL INFO */}
        <div className="page-section">
          <h2 className="stitle">
            <span className="stitle-icon"><IconInfo size={22} strokeWidth={1.8} /></span>
            Useful Information
          </h2>
          <div className="info-cards-grid">
            <div className="icard">
              <div className="icard-icon"><IconIncluded size={24} strokeWidth={1.6} style={{ color: 'var(--primary)' }} /></div>
              <div>
                <h4>Included in Price</h4>
                <p>Paddles, life jackets, waterproof dry bag</p>
              </div>
            </div>
            <div className="icard">
              <div className="icard-icon"><IconTransport size={24} strokeWidth={1.6} style={{ color: 'var(--primary)' }} /></div>
              <div>
                <h4>Transport</h4>
                <p>Boat transport to start point and pickup at finish: {route.transportCost}€</p>
              </div>
            </div>
            <div className="icard">
              <div className="icard-icon"><IconSeason size={24} strokeWidth={1.6} style={{ color: 'var(--primary)' }} /></div>
              <div>
                <h4>Best Time</h4>
                <p>May — September. Water levels are optimal during summer months.</p>
              </div>
            </div>
            <div className="icard">
              <div className="icard-icon"><IconNote size={24} strokeWidth={1.6} style={{ color: 'var(--accent)' }} /></div>
              <div>
                <h4>Notes</h4>
                <p>{content.difficulty === 'Hard' ? 'Prior paddling experience recommended.' : content.difficulty === 'Medium' ? 'Basic paddling fitness required.' : 'Suitable for all fitness levels.'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="page-section">
          <div className="cta-banner">
            <h2>Ready to Paddle?</h2>
            <p>Choose a date, boat type, and quantity — we&apos;ll take care of the rest.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href={`/booking?route=${route.slug}`} className="btn btn-white">Book This Route</Link>
              <Link href="/contact" className="btn btn-outline">Ask a Question</Link>
            </div>
          </div>
        </div>

        {/* RELATED ROUTES */}
        {relatedRoutes.length > 0 && (
          <div className="page-section">
            <h2 className="stitle">
              <span className="stitle-icon"><IconRoute size={22} strokeWidth={1.8} /></span>
              Other {route.river} Routes
            </h2>
            <div className="related-3">
              {relatedRoutes.map(r => {
                const rc = getRouteContent(r.slug)
                const daysValue = typeof r.days === 'string' ? parseInt(r.days) : r.days
                return (
                  <Link href={`/routes/${r.slug}`} className="rel-card" key={r.slug}>
                    <div className="rel-img">
                      <IconMap size={36} strokeWidth={1.2} style={{ color: 'var(--primary)', opacity: 0.4 }} />
                    </div>
                    <div className="rel-body">
                      <h4>{r.name}</h4>
                      <div className="rel-meta">
                        {rc.km > 0 && <span>{rc.km} km</span>}
                        <span>{daysValue === 1 && rc.hours ? rc.hours + 'h' : `${daysValue} days`}</span>
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
