import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { getBranches } from '@/lib/airtable'
import { getContactPage } from '@/lib/content'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Contact Us | Mučas Laivu Noma',
  description: 'Get in touch with Mučas Laivu Noma. Contact any of our 6 branches across Latvia.',
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [branches, c, t] = await Promise.all([
    getBranches(),
    getContactPage(locale),
    getTranslations('contact'),
  ])

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
                    <h4>{t('phoneWhatsapp')}</h4>
                    <p><a href="tel:+37129211634">+371 29211634</a></p>
                    <p className="cm-note">{c.phoneNote}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="cm-icon"><Mail size={20} strokeWidth={1.8} /></div>
                  <div>
                    <h4>{t('email')}</h4>
                    <p><a href="mailto:info@laivunoma.com">info@laivunoma.com</a></p>
                    <p className="cm-note">{c.emailNote}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="cm-icon"><MapPin size={20} strokeWidth={1.8} /></div>
                  <div>
                    <h4>{t('location')}</h4>
                    <p>Jāņa Čakstes 1-41, Sigulda, LV-2150</p>
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
              <div className="booking-card">
                <h3>{t('sendMessage')}</h3>
                <form className="contact-form">
                  <div className="form-group">
                    <label>{t('name')}</label>
                    <input type="text" placeholder={t('namePlaceholder')} />
                  </div>
                  <div className="form-group">
                    <label>{t('email')}</label>
                    <input type="email" placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label>{t('subject')}</label>
                    <select>
                      <option>{t('subjectGeneral')}</option>
                      <option>{t('subjectRoute')}</option>
                      <option>{t('subjectGroup')}</option>
                      <option>{t('subjectCorporate')}</option>
                      <option>{t('subjectPartnership')}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('message')}</label>
                    <textarea rows={5} placeholder={t('messagePlaceholder')} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t('sendBtn')}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 style={{ marginBottom: 40, fontSize: 28, fontWeight: 700, textAlign: 'center' }}>{t('ourBranches')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {branches.map(branch => (
              <div
                key={branch.slug}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: 24,
                }}
              >
                <h3 style={{ marginBottom: 4 }}>{branch.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>
                  {branch.region}
                </p>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ margin: '0 0 4px', fontWeight: 600 }}>{branch.contactPerson}</p>
                  <a href={`tel:${branch.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)', textDecoration: 'none', marginBottom: 8, fontSize: 14 }}>
                    <Phone size={16} />
                    {branch.phone}
                  </a>
                  <a href={`mailto:${branch.email}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)', textDecoration: 'none', fontSize: 14 }}>
                    <Mail size={16} />
                    {branch.email}
                  </a>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                  {branch.bookingType === 'online' && (
                    <p style={{ fontSize: 13, color: 'var(--primary)', margin: '4px 0 0' }}>{t('onlineBooking')}</p>
                  )}
                  {branch.bookingType === 'phone' && (
                    <p style={{ fontSize: 13, color: 'var(--accent)', margin: '4px 0 0' }}>{t('phoneBooking')}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
