import { Link } from '@/i18n/navigation'
import { getRoutes, getBoats } from '@/lib/airtable'
import { getAllRivers } from '@/lib/all-rivers'
import { getHomePage } from '@/lib/content'
import { getHeroImages } from '@/lib/cloudinary'
import { RiverCard } from '@/components/RiverCard'
import { HeroCarousel } from '@/components/HeroCarousel'
import { HeroBookingWidget } from '@/components/HeroBookingWidget'
import { IconSafety, IconTransport, IconExpertise, IconSeats, IconSailboat } from '@/components/Icons'

const WHY_ICONS = [
  <IconSafety size={28} strokeWidth={1.6} style={{ color: 'var(--primary)' }} />,
  <IconTransport size={28} strokeWidth={1.6} style={{ color: 'var(--primary)' }} />,
  <IconExpertise size={28} strokeWidth={1.6} style={{ color: 'var(--primary)' }} />,
  <IconSeats size={28} strokeWidth={1.6} style={{ color: 'var(--primary)' }} />,
]

export const revalidate = 60

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const [allRivers, allRoutes, allBoats, c, heroImages] = await Promise.all([
    getAllRivers(locale), getRoutes(locale), getBoats(), getHomePage(locale), getHeroImages(),
  ])
  const rivers = allRivers.slice(0, 6)
  const routes = allRoutes.slice(0, 4)

  return (
    <>
      {/* HERO — full-bleed photo */}
      <section className="hero-photo">
        <HeroCarousel images={heroImages} />
        <div className="hero-photo-overlay" />
        <div className="hero-photo-inner">
          <div className="hero-photo-left">
            <span className="hero-photo-badge">{c.heroBadge}</span>
            <h1 className="hero-photo-title">{c.heroHeading}</h1>
            <p className="hero-photo-sub">{c.heroSubtitle}</p>
            <div className="hero-photo-btns">
              <Link href="/rivers" className="btn btn-white">{c.heroBtn1}</Link>
              <a href="#how" className="btn btn-outline">{c.heroBtn2}</a>
            </div>
            <div className="hero-photo-stats">
              <div className="hps-item"><span className="hps-num">{allRivers.length}</span><span className="hps-lbl">{c.statRiversLabel}</span></div>
              <div className="hps-item"><span className="hps-num">{allRoutes.length}</span><span className="hps-lbl">{c.statRoutesLabel}</span></div>
              <div className="hps-item"><span className="hps-num">{allBoats.length}</span><span className="hps-lbl">{c.statBoatTypesLabel}</span></div>
            </div>
          </div>
          <HeroBookingWidget />
        </div>
      </section>

      {/* RIVERS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="label">{c.riversLabel}</div>
            <h2>{c.riversHeading}</h2>
            <p>{c.riversSubtitle}</p>
          </div>
          <div className="card-grid-3">
            {rivers.map(r => (
              <RiverCard key={r.slug} {...r} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/rivers" className="btn btn-primary">{c.riversBtnLabel}</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section gray" id="how">
        <div className="container">
          <div className="section-head">
            <div className="label">{c.howLabel}</div>
            <h2>{c.howHeading}</h2>
            <p>{c.howSubtitle}</p>
          </div>
          <div className="steps">
            {c.howSteps.map((s, i) => (
              <div className="step" key={i}>
                <div className="step-num">{i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="label">{c.routesLabel}</div>
            <h2>{c.routesHeading}</h2>
            <p>{c.routesSubtitle}</p>
          </div>
          <div className="card-grid-4">
            {routes.map(r => (
              <Link href={{ pathname: '/routes/[slug]', params: { slug: r.slug } }} className="route-card" key={r.slug}>
                <div className={`rtc-top ${r.gradient}`}>
                  <span className="rtc-diff">{r.days} {r.days === 1 ? 'day' : 'days'}</span>
                  <IconSailboat size={32} strokeWidth={1.6} />
                </div>
                <div className="rtc-body">
                  <h4>{r.name}</h4>
                  <div className="river-name">{r.river}</div>
                  <div className="meta">{r.km > 0 ? `${r.km} km · ` : ''}{r.days} {r.days === 1 ? 'day' : 'days'} on the water</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section gray">
        <div className="container">
          <div className="section-head">
            <div className="label">{c.whyLabel}</div>
            <h2>{c.whyHeading}</h2>
          </div>
          <div className="feature-grid">
            {c.whyFeatures.map((f, i) => (
              <div className="feature" key={i}>
                <div className="icon">{WHY_ICONS[i % WHY_ICONS.length]}</div>
                <h4>{f.title}</h4>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section green">
        <div className="container">
          <div className="section-head">
            <div className="label white">{c.testimonialsLabel}</div>
            <h2>{c.testimonialsHeading}</h2>
          </div>
          <div className="testimonial-grid">
            {c.testimonials.map((t, i) => (
              <div className="testimonial" key={i}>
                <p>&ldquo;{t.text}&rdquo;</p>
                <div className="author">{t.author}</div>
                <div className="source">{t.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>{c.ctaHeading}</h2>
            <p>{c.ctaSubtitle}</p>
            <div className="cta-btns">
              <Link href="/rivers" className="btn btn-white">{c.ctaBtn1}</Link>
              <Link href="/booking" className="btn btn-outline">{c.ctaBtn2}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
