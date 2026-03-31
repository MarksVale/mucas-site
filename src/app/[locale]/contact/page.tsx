import PageHero from '@/components/PageHero'
import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { getBranches } from '@/lib/airtable'
import { getContactPage } from '@/lib/content'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isLv = locale !== 'en'
  const title = isLv ? `Kontakti | ${SITE_NAME}` : `Contact Us | ${SITE_NAME}`
  const description = isLv
    ? 'Sazinies ar Mučas Laivu Noma. Mūsu 6 filiāles visā Latvijā - zvaniet, rakstiet vai rezervējiet tiešsaistē.'
    : 'Get in touch with Mučas Laivu Noma. Contact any of our 6 branches across Latvia.'
  return {
    title, description,
    alternates: buildAlternates('/contact'),
    openGraph: buildOpenGraph({ locale, title, description, path: '/contact' }),
    twitter: twitterCard,
  }
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
      <PageHero heading={c.heroHeading} subtitle={c.heroSubtitle} />

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
                    <p><a href={`tel:${c.phone.replace(/\s/g,'')}`}>{c.phone}</a></p>
                    <p className="cm-note">{c.phoneNote}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="cm-icon"><Mail size={20} strokeWidth={1.8} /></div>
                  <div>
                    <h4>{t('email')}</h4>
                    <p><a href={`mailto:${c.email}`}>{c.email}</a></p>
                    <p className="cm-note">{c.emailNote}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="cm-icon"><MapPin size={20} strokeWidth={1.8} /></div>
                  <div>
                    <h4>{t('location')}</h4>
                    <p>{c.address}</p>
                    <p className="cm-note">{c.locationNote}</p>
                  </div>
                </div>
              </div>

              <div className="contact-business">
                <p><strong>{c.businessName || 'SIA \"Mučas\"'}</strong></p>
                {c.regNr && <p>Reģ. Nr.: {c.regNr}</p>}
                {c.bankBic && <p>A/S SEB banka &middot; {c.bankBic}</p>}
                {c.iban && <p>IBAN: {c.iban}</p>}
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {branches.map(branch => (
              <div key={branch.slug} className="branch-card">
                <div className="branch-header">
                  <h3>{branch.name}</h3>
                  <span className="branch-person">{branch.contactPerson}</span>
                </div>
                <p className="branch-region">{branch.region}</p>
                <div className="branch-contacts">
                  <a href={`tel:${branch.phone}`}><Phone size={14} />{branch.phone}</a>
                  <a href={`mailto:${branch.email}`}><Mail size={14} />{branch.email}</a>
                </div>
                <div className="branch-footer">
                  {branch.bookingType === 'online' && <p style={{ color: 'var(--primary)' }}>{t('onlineBooking')}</p>}
                  {branch.bookingType === 'phone' && <p style={{ color: 'var(--accent)' }}>{t('phoneBooking')}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
