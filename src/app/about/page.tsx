import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Mučas Laivu Noma',
  description: 'Learn about Mučas Laivu Noma — Latvia\'s premier river adventure company. Our story, mission, and team.',
}

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>About Mučas</h1>
          <p>Making Latvia&apos;s rivers accessible to everyone since 2020</p>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div className="about-content">
            <h2>Our Story</h2>
            <p className="route-desc">
              Mučas Laivu Noma started with a simple idea: Latvia has some of the most beautiful rivers in the Baltics, but getting out on the water shouldn&apos;t be complicated. We built a service that handles all the logistics — boats, gear, transport — so you can focus on what matters: enjoying the river.
            </p>
            <p className="route-desc">
              Based in Cēsis, in the heart of Gauja National Park, we now operate across 21 rivers with over 110 routes. From gentle family floats on the Abava to exciting rapids on the Salaca, we have something for every skill level and adventure appetite.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section gray">
        <div className="container">
          <div className="section-head">
            <div className="label">Values</div>
            <h2>What We Stand For</h2>
          </div>
          <div className="feature-grid">
            <div className="feature">
              <div className="icon">🌍</div>
              <h4>Respect for Nature</h4>
              <p>We follow leave-no-trace principles and actively maintain the rivers and camping spots we use. Every trip includes a waste bag.</p>
            </div>
            <div className="feature">
              <div className="icon">🤝</div>
              <h4>Local Community</h4>
              <p>We partner with local farmers, guesthouses, and guides along every river. Your trip supports the rural economy.</p>
            </div>
            <div className="feature">
              <div className="icon">🛡️</div>
              <h4>Safety Always</h4>
              <p>Every paddler gets a safety briefing, life jacket, and waterproof emergency contact card. We monitor weather and water levels daily.</p>
            </div>
            <div className="feature">
              <div className="icon">♿</div>
              <h4>Accessibility</h4>
              <p>We offer adapted boats and assisted launch for paddlers with mobility challenges on selected routes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="label">Impact</div>
            <h2>Mučas in Numbers</h2>
          </div>
          <div className="hero-stats" style={{ justifyContent: 'center' }}>
            <div className="hero-stat"><div className="num">5,000+</div><div className="lbl">Happy paddlers</div></div>
            <div className="hero-stat"><div className="num">21</div><div className="lbl">Rivers</div></div>
            <div className="hero-stat"><div className="num">110</div><div className="lbl">Routes</div></div>
            <div className="hero-stat"><div className="num">6</div><div className="lbl">Seasons</div></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Come Paddle With Us</h2>
            <p>Questions? Want to plan a group trip? We&apos;d love to hear from you.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href="/contact" className="btn btn-white">Get in Touch</Link>
              <Link href="/rivers" className="btn btn-outline">Browse Rivers</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
