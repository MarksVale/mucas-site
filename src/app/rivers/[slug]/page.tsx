import Link from 'next/link'
import Image from 'next/image'
import { getRivers, getRiver, getRoutesByRiver } from '@/lib/airtable'
import { getRiverContent, getRouteContent } from '@/lib/content'
import { cldHero, cldGallery } from '@/lib/cloudinary'
import { IconDistance, IconWater, IconBoat, IconHighlight, IconRoute, IconSeason, IconGallery } from '@/components/Icons'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const rivers = await getRivers()
  return rivers.map(r => ({ slug: r.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const river = await getRiver(slug)
  const content = getRiverContent(slug)
  if (!river) return { title: 'River Not Found' }
  return {
    title: `${river.name} River Kayak & Canoe Trips | Mučas Laivu Noma`,
    description: content.description || `Boat rentals on the ${river.name} river. ${river.routeCount} routes available.`,
  }
}

export default async function RiverPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const river = await getRiver(slug)
  const routes = await getRoutesByRiver(slug)
  const content = getRiverContent(slug)

  if (!river) return <div className="container" style={{ padding: '80px 0' }}><h1>River not found</h1></div>

  const hasPhotos = (content.galleryCount ?? 0) > 0
  const galleryCount = content.galleryCount ?? 0

  return (
    <>
      {/* HERO */}
      <section
        className={`river-hero ${river.gradient}${hasPhotos ? ' river-hero-photo' : ''}`}
        style={hasPhotos ? { backgroundImage: `url(${cldHero('rivers', slug)})` } : undefined}
      >
        {hasPhotos && <div className="hero-overlay" />}
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="river-hero-inner">
            <p className="breadcrumb" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
              <Link href="/rivers" style={{ color: 'rgba(255,255,255,0.7)' }}>← All Rivers</Link>
            </p>
            <h1>{river.name} River</h1>
            {content.region && (
              <p className="river-hero-sub">{content.region} · {content.season}</p>
            )}
          </div>
        </div>
      </section>

      {/* FLOATING STATS BAR */}
      <div className="floating-stats">
        <div className="floating-stats-inner">
          {content.totalLength > 0 && (
            <div className="fstat">
              <div className="fstat-icon"><IconDistance size={24} strokeWidth={1.6} /></div>
              <div className="fstat-value">{content.totalLength} km</div>
              <div className="fstat-label">Total Length</div>
            </div>
          )}
          <div className="fstat">
            <div className="fstat-icon"><IconRoute size={24} strokeWidth={1.6} /></div>
            <div className="fstat-value">{river.routeCount}</div>
            <div className="fstat-label">Routes</div>
          </div>
          {river.boatCategories.length > 0 && (
            <div className="fstat">
              <div className="fstat-icon"><IconBoat size={24} strokeWidth={1.6} /></div>
              <div className="fstat-value">{river.boatCategories.length}</div>
              <div className="fstat-label">Boat Types</div>
            </div>
          )}
          {content.season && (
            <div className="fstat">
              <div className="fstat-icon"><IconSeason size={24} strokeWidth={1.6} /></div>
              <div className="fstat-value">{content.season}</div>
              <div className="fstat-label">Season</div>
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
              <span className="stitle-icon"><IconWater size={22} strokeWidth={1.8} /></span>
              About the {river.name}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 800 }}>
              {content.description}
            </p>
          </div>
        )}

        {/* GALLERY */}
        {hasPhotos && (
          <div className="page-section">
            <h2 className="stitle">
              <span className="stitle-icon"><IconGallery size={22} strokeWidth={1.8} /></span>
              Gallery
            </h2>
            <div className="photo-gallery">
              <div className="pg-item pg-item-main">
                <Image
                  src={cldGallery('rivers', slug, 1)}
                  alt={`${river.name} river`}
                  width={800} height={560}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {Array.from({ length: Math.min(galleryCount - 1, 4) }, (_, i) => (
                <div className="pg-item" key={i}>
                  <Image
                    src={cldGallery('rivers', slug, i + 2)}
                    alt={`${river.name} river photo ${i + 2}`}
                    width={800} height={560}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HIGHLIGHTS — max 3 */}
        {content.highlights.length > 0 && (
          <div className="page-section">
            <h2 className="stitle">
              <span className="stitle-icon"><IconHighlight size={22} strokeWidth={1.8} /></span>
              Highlights
            </h2>
            <div className="hl-cards">
              {content.highlights.slice(0, 3).map((h, i) => (
                <div className="hl-card" key={i}>
                  <div className="hl-card-icon"><IconHighlight size={26} strokeWidth={1.6} style={{ color: 'var(--primary)' }} /></div>
                  <h4>{h.name}</h4>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, margin: '6px 0 0' }}>{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AVAILABLE BOATS */}
        {river.boatCategories.length > 0 && (
          <div className="page-section">
            <h2 className="stitle">
              <span className="stitle-icon"><IconBoat size={22} strokeWidth={1.8} /></span>
              Available Boats
            </h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {river.boatCategories.map((cat, i) => (
                <span key={i} style={{
                  background: 'var(--tint)', color: 'var(--primary)',
                  padding: '10px 20px', borderRadius: 'var(--radius)',
                  fontWeight: 700, fontSize: 14, border: '1px solid var(--border)'
                }}>{cat}</span>
              ))}
            </div>
            <p style={{ marginTop: 16, fontSize: 14, color: 'var(--text-secondary)' }}>
              View all boats and prices on our <Link href="/fleet" style={{ color: 'var(--primary)', fontWeight: 600 }}>fleet page →</Link>
            </p>
          </div>
        )}

        {/* ROUTES LIST */}
        <div className="page-section">
          <h2 className="stitle">
            <span className="stitle-icon"><IconRoute size={22} strokeWidth={1.8} /></span>
            All Routes on the {river.name}
          </h2>
          <div className="route-list">
            {routes.map(r => {
              const rc = getRouteContent(r.slug)
              const dur = r.days === 1 && rc.hours ? rc.hours + 'h' : `${r.days} days`
              return (
                <Link href={`/routes/${r.slug}`} className="route-list-item" key={r.slug}>
                  <div className="rli-left">
                    <div>
                      <h4>{r.name}</h4>
                      <div className="rli-meta">
                        {rc.km > 0 && `${rc.km} km · `}{dur}
                        {rc.difficulty && ` · ${rc.difficulty}`}
                      </div>
                    </div>
                  </div>
                  <div className="rli-right">
                    {rc.difficulty && (
                      <span className={`diff-badge-sm diff-${rc.difficulty.toLowerCase().replace(' ', '')}`}>
                        {rc.difficulty}
                      </span>
                    )}
                    <div className="rli-price">Transport: {r.transportCost}€</div>
                    <span className="rli-arrow">→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="page-section">
          <div className="cta-banner">
            <h2>Ready to Paddle the {river.name}?</h2>
            <p>Pick a route above and book your adventure. We handle the rest.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/booking" className="btn btn-white">Book Now</Link>
              <Link href="/contact" className="btn btn-outline">Ask a Question</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
