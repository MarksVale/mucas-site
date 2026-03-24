import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { getContactPage, getSettings } from '@/lib/content'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact Us | Mučas Laivu Noma',
  description: 'Get in touch with Mučas Laivu Noma. Phone, email, or visit us in Sigulda, Latvia.',
}

export default async function ContactPage() {
  const [c, settings] = await Promise.all([getContactPage(), getSettings()])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{c.heroHeading}</h1>
          <p>{c.heroSubtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>{c.formHeading}</h2>
              <p className="route-desc">{c.formSubtitle}</p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="cm-icon">
                    <MessageCircle size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4>Phone &amp; WhatsApp</h4>
                    <p><a href={`tel:${settings.phone.replace(/\s/g, '')}`}>{settings.phone}</a></p>
                    <p className="cm-note">{c.phoneNote}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="cm-icon"><Mail size={20} strokeWidth={1.8} /></div>
                  <div>
                    <h4>Email</h4>
                    <p><a href={`mailto:${settings.email}`}>{settings.email}</a></p>
                    <p className="cm-note">{c.emailNote}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="cm-icon"><MapPin size={20} strokeWidth={1.8} /></div>
                  <div>
                    <h4>Location</h4>
                    <p>{settings.address}</p>
                    <p className="cm-note">{c.locationNote}</p>
                  </div>
                </div>
              </div>

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
