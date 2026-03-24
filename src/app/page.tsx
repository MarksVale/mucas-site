import Link from 'next/link'
import { getRivers, getRoutes, getBoats } from '@/lib/airtable'

const testimonials = [
  { text: "Amazing experience on the Gauja! The team was super helpful, equipment was great, and the scenery was breathtaking.", author: 'Laura K.', source: 'Google Reviews' },
  { text: "Perfect family trip. Kids loved it! The route was easy and safe, and the camping spot was beautiful.", author: 'Māris B.', source: 'TripAdvisor' },
  { text: "2-day trip on the Salaca. Great rapids, beautiful nature, and the shuttle service made logistics so easy. 10/10.", author: 'Anna & Jānis', source: 'Google Reviews' },
]

export default async function Home() {
  const allRivers = await getRivers()
  const allRoutes = await getRoutes()
  const allBoats = await getBoats()
  const rivers = allRivers.slice(0, 4)
  const routes = allRoutes.slice(0, 4)

  return (
    <>
      {/* HERO */}
      <section className="hero-full">
        <div className="hero-inner">
          <div className="hero-badge">Season 2026 Now Open</div>
          <h1>Explore Latvia&apos;s Rivers by Boat</h1>
          <p className="hero-sub">Rent kayaks, canoes, and rafts for unforgettable river adventures across Latvia.</p>
          <div className="hero-btns">
            <Link href="/rivers" className="btn btn-white">Browse Routes</Link>
            <Link href="#how" className="btn btn-outline">How It Works</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">{allRivers.length}</div><div className="lbl">Rivers</div></div>
            <div className="hero-stat"><div className="num">{allRoutes.length}</div><div className="lbl">Routes</div></div>
            <div className="hero-stat"><div className="num">{allBoats.length}</div><div className="lbl">Boat Types</div></div>
            <div className="hero-stat"><div className="num">{Math.min(...allBoats.map(b => b.pricePerDay))}€</div><div className="lbl">From / day</div></div>
          </div>
        </div>
      </section>

      {/* RIVERS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="label">Discover</div>
            <h2>Our Rivers</h2>
            <p>Choose your river and find the perfect route</p>
          </div>
          <div className="card-grid-3">
            {rivers.map(r => (
              <Link href={`/rivers/${r.slug}`} className="river-card" key={r.slug}>
                <div className={`rc-img ${r.gradient}`}>
                  <div className="overlay" />
                  <h3>{r.name}</h3>
                  <span className="rc-badge">{r.routeCount} routes</span>
                </div>
                <div className="rc-body">
                  <div className="rc-meta">
                    <span>{r.boatCategories.join(', ')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/rivers" className="btn btn-primary">View All Rivers →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section gray" id="how">
        <div className="container">
          <div className="section-head">
            <div className="label">Simple</div>
            <h2>How It Works</h2>
            <p>From choosing your route to paddling — we make it effortless</p>
          </div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><h4>Choose Your Route</h4><p>Browse routes across {allRivers.length} rivers. Pick by river, duration, or group size.</p></div>
            <div className="step"><div className="step-num">2</div><h4>Pick Your Boat</h4><p>Kayaks, canoes, rafts, or SUPs. Solo or group — we have {allBoats.length} boat types.</p></div>
            <div className="step"><div className="step-num">3</div><h4>Book Online</h4><p>Select your date and start time. Instant confirmation. Secure payment.</p></div>
            <div className="step"><div className="step-num">4</div><h4>Paddle &amp; Enjoy</h4><p>We handle gear, transport, and safety. You just enjoy the river.</p></div>
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="label">Top Picks</div>
            <h2>Popular Routes</h2>
            <p>Most booked trips this season</p>
          </div>
          <div className="card-grid-4">
            {routes.map(r => (
              <Link href={`/routes/${r.slug}`} className="route-card" key={r.slug}>
                <div className={`rtc-top ${r.gradient}`}>
                  <span className="rtc-diff">{r.days} {r.days === 1 ? 'day' : 'days'}</span>
                  🛶
                </div>
                <div className="rtc-body">
                  <h4>{r.name}</h4>
                  <div className="river-name">{r.river}</div>
                  <div className="meta">Transport: from {r.transportCost}€* &bull; Hub: {r.hub}</div>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: 16 }}>* Transport costs are estimates and may vary based on group size and external factors.</p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section gray">
        <div className="container">
          <div className="section-head">
            <div className="label">Why Us</div>
            <h2>Why Choose Mučas</h2>
          </div>
          <div className="feature-grid">
            <div className="feature"><div className="icon">🛡️</div><h4>Safety First</h4><p>All equipment inspected. Safety briefing before every trip.</p></div>
            <div className="feature"><div className="icon">🚐</div><h4>Full Logistics</h4><p>Shuttle service and boat transport — we handle everything.</p></div>
            <div className="feature"><div className="icon">💬</div><h4>Local Expertise</h4><p>Our team knows every river and every route.</p></div>
            <div className="feature"><div className="icon">👨‍👩‍👧‍👦</div><h4>Family Friendly</h4><p>Routes and boats for all ages and group sizes.</p></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section green">
        <div className="container">
          <div className="section-head">
            <div className="label white">Reviews</div>
            <h2>What Our Guests Say</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial" key={i}>
                <div className="stars">⭐⭐⭐⭐⭐</div>
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
            <h2>Ready for Your River Adventure?</h2>
            <p>Browse routes, pick your boat, and book. Season 2026 is open!</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href="/rivers" className="btn btn-white">Browse All Routes</Link>
              <Link href="/booking" className="btn btn-outline">Book Now</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
