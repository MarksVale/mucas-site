import { Link } from '@/i18n/navigation'
import { getRoute, getRoutes, getRoutesByRiver, getRiver, getBranchForRiver } from '@/lib/airtable'
import { getRouteContent } from '@/lib/content'
import { cldHero, cldCard } from '@/lib/cloudinary'
import { IconDistance, IconDuration, IconDifficulty, IconHighlight, IconInfo, IconIncluded, IconTransport, IconSeason, IconNote, IconRoute, IconNature, IconBoat } from '@/components/Icons'
import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME, buildRouteLD } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'
import { FaqSection } from '@/components/FaqSection'

export async function generateStaticParams() {
  const routes = await getRoutes()
  return routes.map(r => ({ slug: r.slug }))
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await props.params
  const route = await getRoute(slug, locale)
  if (!route) return { title: 'Route Not Found' }
  const content = getRouteContent(route)
  const isLv = locale !== 'en'
  const title = isLv
    ? `${route.name} | ${route.river} upe | ${SITE_NAME}`
    : `${route.name} | ${route.river} River | ${SITE_NAME}`
  const description = content.description || (isLv
    ? `${route.name} uz ${route.river} upes. ${route.days} dienu brauciens.`
    : `${route.name} on the ${route.river} river. ${route.days}-day trip.`)
  const heroImg = `https://res.cloudinary.com/mucas/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_auto/mucas/rivers/${route.riverSlug}/hero`
  return {
    title,
    description,
    alternates: buildAlternates(`/routes/${slug}`),
    openGraph: buildOpenGraph({ locale, title, description, path: `/routes/${slug}`, image: heroImg }),
    twitter: twitterCard,
  }
}

export default async function RoutePage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params
  const route = await getRoute(slug, locale)
  if (!route) return <div className="container" style={{ padding: '80px 0' }}><h1>Route not found</h1></div>
  const [river, branch, riverRoutes] = await Promise.all([
    getRiver(route.riverSlug, locale), getBranchForRiver(route.riverSlug), getRoutesByRiver(route.riverSlug, locale),
  ])
  const isOnlineBookable = !river || river.bookingType === 'online'
  const relatedRoutes = riverRoutes.filter(r => r.slug !== slug).slice(0, 3)
  const content = getRouteContent(route)
  const topHighlights = content.highlights.slice(0, 3)
  const durationDisplay = route.days === 1 && content.hours ? content.hours + 'h' : `${route.days} days`
  const t = await getTranslations('route')
  const c = await getTranslations('common')
  const routeLD = buildRouteLD({
    locale,
    name: route.name,
    slug,
    river: route.river,
    riverSlug: route.riverSlug,
    description: content.description || '',
    days: route.days,
    km: route.km ?? 0,
    difficulty: route.difficulty,
    priceFrom: river?.priceFrom,
    hours: content.hours,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(routeLD) }} />
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
        {route.boats.length > 0 && (
          <div className="page-section">
            <h2 className="stitle"><span className="stitle-icon"><IconBoat size={22} strokeWidth={1.8} /></span>{t('availableBoats')}</h2>
            <div className="boat-ticker">
              <div className="boat-ticker-inner">
                {route.boats.map((name, i) => (
                  <Link key={i} href="/fleet" className="boat-pill">{name}</Link>
                ))}
                {route.boats.map((name, i) => (
                  <Link key={'r' + i} href="/fleet" className="boat-pill" aria-hidden="true">{name}</Link>
                ))}
              </div>
            </div>
          </div>
        )}
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
        <FaqSection />
        <div className="page-section">
          <div className="cta-banner">
            {isOnlineBookable ? (
              <>
                <h2>{t('readyTitle')}</h2>
                <p>{t('readyDesc')}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <Link href={{ pathname: '/booking', query: { route: route.slug } }} className="btn btn-primary">{t('bookRoute')}</Link>
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
                      {branch.phone && <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="btn btn-primary">{t('callPhone', { phone: branch.phone })}</a>}
                      {branch.email && <a href={`mailto:${branch.email}?subject=Route enquiry: ${encodeURIComponent(route.name)}`} className="btn btn-outline">{t('emailUs')}</a>}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Link href="/contact" className="btn btn-primary">{c('contactUs')}</Link>
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
                    <div className="rel-img" style={{ backgroundImage: `url(${cldCard(r.riverSlug)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
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
