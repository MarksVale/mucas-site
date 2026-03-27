import { Link } from '@/i18n/navigation'
import { getRoute, getRoutes, getRoutesByRiver, getBoats, getRiver, getBranchForRiver } from '@/lib/airtable'
import { getRouteContent } from '@/lib/content'
import { cldHero, cldGallery, cldBoat, CLD_BOAT_FALLBACK } from '@/lib/cloudinary'
import PhotoCarousel from '@/components/PhotoCarousel'
import BoatPhoto from '@/components/BoatPhoto'
import { BoatIcon } from '@/components/Icons'
import RouteMap from '@/components/RouteMap'
import { IconDistance, IconDuration, IconDifficulty, IconHighlight, IconGallery, IconInfo, IconIncluded, IconTransport, IconSeason, IconNote, IconMap, IconRoute, IconNature } from '@/components/Icons'
import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'

export async function generateStaticParams() {
  const routes = await getRoutes()
  return routes.map(r => ({ slug: r.slug }))
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await props.params
  const route = await getRoute(slug)
  if (!route) return { title: 'Route Not Found' }
  const content = getRouteContent(route)
  const isLv = locale !== 'en'
  const title = isLv
    ? `${route.name} | ${route.river} upe | ${SITE_NAME}`
    : `${route.name} | ${route.river} River | ${SITE_NAME}`
  const description = content.description || (isLv
    ? `${route.name} uz ${route.river} upes. ${route.days} dienu brauciens.`
    : `${route.name} on the ${route.river} river. ${route.days}-day trip.`)
  return {
    title,
    description,
    alternates: buildAlternates(`/routes/${slug}`),
    openGraph: buildOpenGraph({ locale, title, description, path: `/routes/${slug}` }),
    twitter: twitterCard,
  }
}

export default async function RoutePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const route = await getRoute(slug)
  if (!route) return <div className="container" style={{ padding: '80px 0' }}><h1>Route not found</h1></div>
  const [allBoats, river, branch, riverRoutes] = await Promise.all([
    getBoats(), getRiver(route.riverSlug), getBranchForRiver(route.riverSlug), getRoutesByRiver(route.riverSlug),
  ])
  const availableBoats = allBoats.filter(b => route.boats.includes(b.name))
  const isOnlineBookable = !river || river.bookingType === 'online'
  const relatedRoutes = riverRoutes.filter(r => r.slug !== slug).slice(0, 3)
  const content = getRouteContent(route)
  const topHighlights = content.highlights.slice(0, 3)
  const galleryCount = content.galleryCount ?? 0
  const durationDisplay = route.days === 1 && content.hours ? content.hours + 'h' : `${route.days} days`
  const t = await getTranslations('route')
  const c = await getTranslations('common')
  const f = await getTranslations('fleet')
  return (
    <>
      <section className={`route-hero ${route.gradient} route-hero-photo`} style={{ backgroundImage: `url(${cldHero('routes', slug)})` }}>
        <div className="hero-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="route-hero-inner">
            <p className="breadcrumb" style={{ marginBottom: 16 }}>
              <Link href="/rivers" style={{ color: 'rgba(255,255,255,0.7)' }}>{t('allRivers')}</Link>
              {' → '}
              <Link href={{ pathname: '/rivers/[slug]', params: { slug: route.riverSlug } }} style={{ color: 'rgba(255,255,255,0.7)' }}>{route.river}</Link>
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
      <div className="floating-stats">
        <div className="floating-stats-inner">
          {content.km > 0 && (
            <div className="fstat">
              <div className="fstat-icon"><IconDistance size={24} strokeWidth={1.6} /></div>
              <div className="fstat-value">{content.km} km</div>
              <div className="fstat-label">{c('distance')}</div>
            </div>
          )}
          <div className="fstat">
            <div className="fstat-icon"><IconDuration size={24} strokeWidth={1.6} /></div>
            <div className="fstat-value">{durationDisplay}</div>
            <div className="fstat-label">{c('duration')}</div>
          </div>
          {content.difficulty && (
            <div className="fstat">
              <div className="fstat-icon"><IconDifficulty size={24} strokeWidth={1.6} /></div>
              <div className="fstat-value">{content.difficulty}</div>
              <div className="fstat-label">{c('difficulty')}</div>
            </div>
          )}
        </div>
      </div>
      <div className="page-content">
        {content.description && (
          <div className="page-section">
            <h2 className="stitle"><span className="stitle-icon"><IconRoute size={22} strokeWidth={1.8} /></span>{t('aboutRoute')}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: 800 }}>{content.description}</p>
          </div>
        )}
        {topHighlights.length > 0 && (
          <div className="page-section">
            <h2 className="stitle"><span className="stitle-icon"><IconHighlight size={22} strokeWidth={1.8} /></span>{t('whatYouSee')}</h2>
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
        {galleryCount > 0 && (
          <div className="page-section">
            <h2 className="stitle"><span className="stitle-icon"><IconGallery size={22} strokeWidth={1.8} /></span>{c('gallery')}</h2>
            <PhotoCarousel images={Array.from({ length: galleryCount }, (_, i) => cldGallery('routes', slug, i + 1))} alt={route.name} />
          </div>
        )}
        {availableBoats.length > 0 && (
          <div className="page-section">
            <h2 className="stitle"><span className="stitle-icon"><IconRoute size={22} strokeWidth={1.8} /></span>{t('availableBoats')}</h2>
            <div className="boats-grid">
              {availableBoats.map(b => (
                <div className="bcard" key={b.slug}>
                  <div className="bcard-photo"><BoatPhoto src={cldBoat(b.slug)} fallback={CLD_BOAT_FALLBACK} alt={b.name} /></div>
                  <div className="bcard-body">
                    <div className="bcard-icon"><BoatIcon category={b.category} size={18} /></div>
                    <h4>{b.name}</h4>
                    <div className="bcard-cap">{b.seats} {b.seats === 1 ? f('seat') : f('seats')} · {b.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="page-section">
          <h2 className="stitle"><span className="stitle-icon"><IconMap size={22} strokeWidth={1.8} /></span>{t('mapTitle')}</h2>
          {content.startLat && content.startLng && content.endLat && content.endLng ? (
            <div className="map-container map-container-live">
              <RouteMap startLat={content.startLat!} startLng={content.startLng!} endLat={content.endLat!} endLng={content.endLng!} label={route.name} riverSlug={route.riverSlug} />
              <div className="map-legend">
                <div className="map-point"><span className="map-dot start"></span><span>{t('mapStart')}: {route.name.split('–')[0]?.trim() || route.river}</span></div>
                <div className="map-point"><span className="map-dot end"></span><span>{t('mapFinish')}: {route.name.split('–').pop()?.trim() || route.river}</span></div>
              </div>
            </div>
          ) : (
            <div className="map-container">
              <div style={{ textAlign: 'center' }}>
                <IconMap size={40} strokeWidth={1.2} style={{ color: 'var(--text-muted)', marginBottom: 10 }} />
                <p style={{ fontSize: 15, color: 'var(--text-muted)', fontWeight: 500 }}>{t('mapComingSoon')}</p>
              </div>
            </div>
          )}
        </div>
        <div className="page-section">
          <h2 className="stitle"><span className="stitle-icon"><IconInfo size={22} strokeWidth={1.8} /></span>{c('usefulInfo')}</h2>
          <div className="info-cards-grid">
            <div className="icard">
              <div className="icard-icon"><IconIncluded size={24} strokeWidth={1.6} style={{ color: 'var(--primary)' }} /></div>
              <div><h4>{t('included')}</h4><p>{t('includedDesc')}</p></div>
            </div>
            <div className="icard">
              <div className="icard-icon"><IconTransport size={24} strokeWidth={1.6} style={{ color: 'var(--primary)' }} /></div>
              <div><h4>{t('transport')}</h4><p>{t('transportDesc')}</p></div>
            </div>
            <div className="icard">
              <div className="icard-icon"><IconSeason size={24} strokeWidth={1.6} style={{ color: 'var(--primary)' }} /></div>
              <div><h4>{t('bestTime')}</h4><p>{t('bestTimeDesc')}</p></div>
            </div>
            <div className="icard">
              <div className="icard-icon"><IconNote size={24} strokeWidth={1.6} style={{ color: 'var(--accent)' }} /></div>
              <div><h4>{t('notes')}</h4><p>{content.difficulty === 'Hard' ? t('notesHard') : content.difficulty === 'Medium' ? t('notesMedium') : t('notesEasy')}</p></div>
            </div>
          </div>
        </div>
        {route.riverSlug === 'salaca' && (
          <div className="page-section">
            <div style={{ background: 'var(--tint)', border: '1px solid var(--border)', borderLeft: '4px solid var(--primary)', borderRadius: 'var(--radius)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <IconNature size={28} strokeWidth={1.6} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 200 }}>
                <h4 style={{ margin: '0 0 4px', fontSize: 16 }}>{t('salacaTitle')}</h4>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t('salacaDesc')}</p>
              </div>
              <a href="https://licuskola.lv" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>{t('salacaLink')}</a>
            </div>
          </div>
        )}
        <div className="page-section">
          <div className="cta-banner">
            {isOnlineBookable ? (
              <>
                <h2>{t('readyTitle')}</h2>
                <p>{t('readyDesc')}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <Link href={{ pathname: '/booking', query: { route: route.slug } }} className="btn btn-white">{t('bookRoute')}</Link>
                  <Link href="/contact" className="btn btn-outline">{t('askQuestion')}</Link>
                </div>
              </>
            ) : (
              <>
                <h2>{t('interestedTitle')}</h2>
                <p>{t('interestedDesc')}</p>
                {branch ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    {branch.contactPerson && <p style={{ margin: 0, fontWeight: 600, fontSize: 16, color: 'var(--color-white, #fff)' }}>{branch.contactPerson} · {branch.name}</p>}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
                      {branch.phone && <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="btn btn-white">{t('callPhone', { phone: branch.phone })}</a>}
                      {branch.email && <a href={`mailto:${branch.email}?subject=Route enquiry: ${encodeURIComponent(route.name)}`} className="btn btn-outline">{t('emailUs')}</a>}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Link href="/contact" className="btn btn-white">{c('contactUs')}</Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {relatedRoutes.length > 0 && (
          <div className="page-section">
            <h2 className="stitle"><span className="stitle-icon"><IconRoute size={22} strokeWidth={1.8} /></span>{t('otherRoutes', { river: route.river })}</h2>
            <div className="related-3">
              {relatedRoutes.map(r => {
                const rc = getRouteContent(r)
                const daysValue = typeof r.days === 'string' ? parseInt(r.days) : r.days
                return (
                  <Link href={{ pathname: '/routes/[slug]', params: { slug: r.slug } }} className="rel-card" key={r.slug}>
                    <div className="rel-img"><IconMap size={36} strokeWidth={1.2} style={{ color: 'var(--primary)', opacity: 0.4 }} /></div>
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
