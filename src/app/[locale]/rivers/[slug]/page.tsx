import Link from 'next/link'
import { getRiver, getRivers, getRoutesByRiver, getBranchForRiver } from '@/lib/airtable'
import { getRiverContent, getRouteContent } from '@/lib/content'
import { cldHero, cldGallery } from '@/lib/cloudinary'
import { IconDistance, IconWater, IconBoat, IconHighlight, IconRoute, IconSeason, IconGallery, IconPhone, IconEmail, IconNature } from '@/components/Icons'
import PhotoCarousel from '@/components/PhotoCarousel'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const rivers = await getRivers()
  return rivers.map(r => ({ slug: r.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const river = await getRiver(slug)
  if (!river) return { title: 'River Not Found' }
  const content = getRiverContent(river)
  return {
    title: `${river.name} River Kayak & Canoe Trips | Mučas Laivu Noma`,
    description: content.description || river.description || `Boat rentals on the ${river.name} river. ${river.routeCount} routes available.`,
  }
}

export default async function RiverPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const river = await getRiver(slug)
  if (!river) return <div className="container" style={{ padding: '80px 0' }}><h1>River not found</h1></div>

  const routes = await getRoutesByRiver(slug)
  const content = getRiverContent(river)
  const branch = await getBranchForRiver(slug)

  const galleryCount = content.galleryCount ?? 0

  return (
    <>
      {/* HERO — always uses Cloudinary (falls back to Salaca if no own photo) */}
      <section
        className={`river-hero ${river.gradient} river-hero-photo`}
        style={{ backgroundImage: `url(${cldHero('rivers', slug)})` }}
      >
        <div className="hero-overlay" />
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
        {(content.description || river.description) && (
          <div className="page-section">
            <h2 className="stitle">
              <span className="stitle-icon"><IconWater size={22} strokeWidth={1.8} /></span>
              About the {river.name}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 800 }}>
              {content.description || river.description}
            </p>
          </div>
        )}

        {/* GALLERY */}
        {galleryCount > 0 && (
          <div className="page-section">
            <h2 className="stitle">
              <span className="stitle-icon"><IconGallery size={22} strokeWidth={1.8} /></span>
              Gallery
            </h2>
            <PhotoCarousel
              images={Array.from({ length: galleryCount }, (_, i) => cldGallery('rivers', slug, i + 1))}
              alt={`${river.name} river`}
            />
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
        {routes.length > 0 && (
        <div className="page-section">
          <h2 className="stitle">
            <span className="stitle-icon"><IconRoute size={22} strokeWidth={1.8} /></span>
            All Routes on the {river.name}
          </h2>
          <div className="route-list">
            {routes.map(r => {
              const rc = getRouteContent(r)
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
                    <span className="rli-arrow">→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        )}

        {/* LĪČU SKOLA BANNER — Salaca only */}
        {slug === 'salaca' && (
          <div className="page-section">
            <div style={{ background: 'var(--tint)', border: '1px solid var(--border)', borderLeft: '4px solid var(--primary)', borderRadius: 'var(--radius)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <IconNature size={28} strokeWidth={1.6} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 200 }}>
                <h4 style={{ margin: '0 0 4px', fontSize: 16 }}>Looking for an overnight stop?</h4>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Līču skola campsite sits right on the Salaca — sauna, fire pit, and meals available on site.
                </p>
              </div>
              <a href="https://licuskola.lv" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
                Learn more →
              </a>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="page-section">
          <div className="cta-banner">
            <h2>Ready to Paddle the {river.name}?</h2>
            {river.bookingType === 'online' ? (
              <>
                <p>Pick a route above and book your adventure. We handle the rest.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <Link href="/booking" className="btn btn-white">Book Now</Link>
                  <Link href="/contact" className="btn btn-outline">Ask a Question</Link>
                </div>
              </>
            ) : branch ? (
              <>
                <p>Contact our {branch.name} branch to book your trip.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <a href={`tel:${branch.phone}`} className="btn btn-white">
                    <IconPhone size={16} strokeWidth={2} /> Call to Book
                  </a>
                  <a href={`mailto:${branch.email}`} className="btn btn-outline">
                    <IconEmail size={16} strokeWidth={2} /> Write to Us
                  </a>
                </div>
                <p style={{ marginTop: 16, fontSize: 14, color: 'white', fontWeight: 700 }}>
                  {branch.contactPerson} • {branch.phone}
                </p>
              </>
            ) : null}
          </div>
        </div>

      </div>
    </>
  )
}
