import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Mučas Laivu Noma',
  description: 'Get in touch with Mučas Laivu Noma. Phone, email, or visit us in Sigulda, Latvia.',
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

                {/* Phone + WhatsApp merged */}
                <div className="contact-method">
                  <div className="cm-icon">
                    <MessageCircle size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4>Phone &amp; WhatsApp</h4>
                    <p><a href="tel:+37129211634">+371 29211634</a></p>
                    <p className="cm-note">Mon–Sat, 9:00–18:00 · WhatsApp fastest</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="cm-icon"><Mail size={20} strokeWidth={1.8} /></div>
                  <div>
                    <h4>Email</h4>
                    <p><a href="mailto:info@laivunoma.com">info@laivunoma.com</a></p>
                    <p className="cm-note">We reply within 24h</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="cm-icon"><MapPin size={20} strokeWidth={1.8} /></div>
                  <div>
                    <h4>Location</h4>
                    <p>Jāņa Čakstes 1-41, Sigulda, LV-2150</p>
                    <p className="cm-note">Gauja National Park area</p>
                  </div>
                </div>

              </div>

              {/* Business info */}
              <div className="contact-business">
                <p><strong>SIA &ldquo;Mučas&rdquo;</strong></p>
                <p>Reģ. Nr.: LV40103263487</p>
                <p>A/S SEB banka &middot; UNLALV2X</p>
                <p>IBAN: LV90UNLA0055005842535</p>
              </div>
            </div>

            <div className="contact-form-wrap">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
