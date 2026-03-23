import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Mučas Laivu Noma',
  description: 'Get in touch with Mučas Laivu Noma. Phone, email, or visit us in Cēsis, Latvia.',
}

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We&apos;re here to help plan your perfect river adventure</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p className="route-desc">Have questions about routes, boats, or group bookings? We respond within 24 hours.</p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="cm-icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>+371 2X XXX XXX</p>
                    <p className="cm-note">Mon–Sat, 9:00–18:00</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="cm-icon">✉️</div>
                  <div>
                    <h4>Email</h4>
                    <p>info@laivunoma.shop</p>
                    <p className="cm-note">We reply within 24h</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="cm-icon">💬</div>
                  <div>
                    <h4>WhatsApp</h4>
                    <p>+371 2X XXX XXX</p>
                    <p className="cm-note">Fastest response</p>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="cm-icon">📍</div>
                  <div>
                    <h4>Location</h4>
                    <p>Cēsis, Latvia</p>
                    <p className="cm-note">Gauja National Park area</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap">
              <div className="booking-card">
                <h3>Send a Message</h3>
                <form className="contact-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select>
                      <option>General inquiry</option>
                      <option>Route recommendation</option>
                      <option>Group booking (10+)</option>
                      <option>Corporate / team event</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea rows={5} placeholder="Tell us about your plans..." />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
