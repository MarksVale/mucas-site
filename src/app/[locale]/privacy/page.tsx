import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isLv = locale !== 'en'
  const title = isLv ? `Privātuma Politika | ${SITE_NAME}` : `Privacy Policy | ${SITE_NAME}`
  const description = isLv
    ? 'Uzzini, kā SIA Mučas apstrādā tavus personas datus.'
    : 'Learn how SIA Mučas handles your personal data.'
  return {
    title, description,
    alternates: buildAlternates('/privacy'),
    openGraph: buildOpenGraph({ locale, title, description, path: '/privacy' }),
    twitter: twitterCard,
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isLv = locale !== 'en'

  if (isLv) {
    return (
      <main className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h1>Privātuma Politika</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Spēkā no: 2026. gada 1. aprīļa
          </p>

          <h2>1. Pārzinis</h2>
          <p>
            SIA „Mučas", reģistrācijas Nr. LV40103263487, juridiskā adrese: Jāņa Čakstes 1-41, Sigulda, LV-2150.<br />
            E-pasts: <a href="mailto:info@laivunoma.com">info@laivunoma.com</a><br />
            Tālrunis: <a href="tel:+37129211634">+371 29 211 634</a>
          </p>

          <h2>2. Kādus datus mēs apkopojam</h2>
          <p>Mēs apkopojam šādus personas datus:</p>
          <ul>
            <li>Vārds, uzvārds</li>
            <li>E-pasta adrese un tālruņa numurs</li>
            <li>Pakalpojuma adreses (piegādes punkts, ja izvēlēts)</li>
            <li>Rezervācijas detaļas (datums, maršruts, laivas veids, dalībnieku skaits)</li>
            <li>Maksājuma darījuma dati (apstrādā Maksekeskus AS)</li>
          </ul>

          <h2>3. Datu apstrādes mērķi un pamats</h2>
          <p>Mēs apstrādājam personas datus šādiem mērķiem:</p>
          <ul>
            <li><strong>Rezervācijas izpilde</strong> - līguma izpilde (VDAR 6. pants, 1. pkt. b)</li>
            <li><strong>Maksājuma apstrāde</strong> - līguma izpilde (VDAR 6. pants, 1. pkt. b)</li>
            <li><strong>Saziņa par rezervāciju</strong> - leģitīmās intereses (VDAR 6. pants, 1. pkt. f)</li>
            <li><strong>Juridisko pienākumu izpilde</strong> - tiesību aktu prasību ievērošana (VDAR 6. pants, 1. pkt. c)</li>
          </ul>

          <h2>4. Maksājumu apstrāde - MakeCommerce</h2>
          <p>
            Maksājumu apstrādi nodrošina maksājumu platforma <a href="https://makecommerce.lv" target="_blank" rel="noopener noreferrer">makecommerce.lv</a>,
            tādēļ mūsu uzņēmums nodod maksājuma izpildei nepieciešamos personas datus platformas
            īpašniekam Maksekeskus AS (reģ. Nr. 12268475, Niine 11, Tallina, Igaunija).
            Maksekeskus AS ir Eiropas Savienības teritorijā reģistrēts datu apstrādātājs, kas darbojas
            saskaņā ar VDAR un Igaunijas datu aizsardzības likumu. Maksekeskus AS privātuma politika
            pieejama vietnē <a href="https://makecommerce.lv/privatuma-politika/" target="_blank" rel="noopener noreferrer">makecommerce.lv/privatuma-politika</a>.
          </p>

          <h2>5. Datu saņēmēji</h2>
          <p>Jūsu personas datus var saņemt:</p>
          <ul>
            <li>Maksekeskus AS - maksājumu apstrādei</li>
            <li>Grāmatvedības pakalpojumu sniedzēji - finanšu uzskaites vajadzībām</li>
            <li>Valsts iestādes - ja to pieprasa tiesību akti</li>
          </ul>
          <p>Mēs nenododam jūsu datus trešajām personām mārketinga nolūkos.</p>

          <h2>6. Datu glabāšanas termiņi</h2>
          <ul>
            <li>Rezervācijas un maksājumu dati - 5 gadi pēc darījuma (saskaņā ar grāmatvedības prasībām)</li>
            <li>Saziņas vēsture - 2 gadi</li>
            <li>
              <strong>Drošības apliecinājuma un piekrišanas ieraksti</strong> - 10 gadi no aktivitātes datuma.
              Juridiskais pamats: leģitīmās intereses - tiesību aizsardzība tiesas procesā (VDAR 6. pants, 1. pkt. f).
              Šie ieraksti satur vārdu, e-pastu un IP adresi piekrišanas brīdī.
            </li>
          </ul>

          <h2>7. Jūsu tiesības</h2>
          <p>Jums ir tiesības:</p>
          <ul>
            <li>Piekļūt saviem personas datiem</li>
            <li>Labot neprecīzus datus</li>
            <li>Pieprasīt datu dzēšanu (ja nav juridiska pienākuma tos glabāt)</li>
            <li>Ierobežot datu apstrādi</li>
            <li>Iebilst pret apstrādi leģitīmo interešu pamata</li>
            <li>Iesniegt sūdzību Datu valsts inspekcijai (<a href="https://www.dvi.gov.lv" target="_blank" rel="noopener noreferrer">dvi.gov.lv</a>)</li>
          </ul>

          <h2>8. Sīkdatnes</h2>
          <p>
            Mūsu vietne izmanto tikai funkcionāli nepieciešamās sīkdatnes. Mēs neizmantojam mārketinga
            vai analītikas sīkdatnes bez jūsu piekrišanas.
          </p>

          <h2>9. Kontakti</h2>
          <p>
            Jautājumu vai pieprasījumu gadījumā sazinieties ar mums:<br />
            E-pasts: <a href="mailto:info@laivunoma.com">info@laivunoma.com</a><br />
            Tālrunis: <a href="tel:+37129211634">+371 29 211 634</a>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1>Privacy Policy</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Effective date: 1 April 2026
        </p>

        <h2>1. Data Controller</h2>
        <p>
          SIA &ldquo;Mučas&rdquo;, registration No. LV40103263487, legal address: Jāņa Čakstes 1-41, Sigulda, LV-2150, Latvia.<br />
          Email: <a href="mailto:info@laivunoma.com">info@laivunoma.com</a><br />
          Phone: <a href="tel:+37129211634">+371 29 211 634</a>
        </p>

        <h2>2. Data We Collect</h2>
        <p>We collect the following personal data:</p>
        <ul>
          <li>Full name</li>
          <li>Email address and phone number</li>
          <li>Service address (delivery point, if selected)</li>
          <li>Booking details (date, route, boat type, number of participants)</li>
          <li>Payment transaction data (processed by Maksekeskus AS)</li>
        </ul>

        <h2>3. Purposes and Legal Basis</h2>
        <p>We process personal data for the following purposes:</p>
        <ul>
          <li><strong>Booking fulfilment</strong> - performance of contract (GDPR Art. 6(1)(b))</li>
          <li><strong>Payment processing</strong> - performance of contract (GDPR Art. 6(1)(b))</li>
          <li><strong>Booking communication</strong> - legitimate interests (GDPR Art. 6(1)(f))</li>
          <li><strong>Legal obligations</strong> - compliance with applicable law (GDPR Art. 6(1)(c))</li>
        </ul>

        <h2>4. Payment Processing &mdash; MakeCommerce</h2>
        <p>
          Payment processing is provided by payment platform{' '}
          <a href="https://makecommerce.lv" target="_blank" rel="noopener noreferrer">makecommerce.lv</a>,
          therefore our company transfers the personal data necessary for payment execution to the platform
          owner Maksekeskus AS (reg. No. 12268475, Niine 11, Tallinn, Estonia).
          Maksekeskus AS is a data processor registered within the European Union, operating in
          accordance with GDPR and Estonian data protection law. The Maksekeskus AS privacy policy is
          available at{' '}
          <a href="https://makecommerce.lv/privacy-policy/" target="_blank" rel="noopener noreferrer">makecommerce.lv/privacy-policy</a>.
        </p>

        <h2>5. Recipients of Your Data</h2>
        <p>Your personal data may be shared with:</p>
        <ul>
          <li>Maksekeskus AS &mdash; for payment processing</li>
          <li>Accounting service providers &mdash; for financial record-keeping</li>
          <li>Public authorities &mdash; where required by law</li>
        </ul>
        <p>We do not sell or share your data with third parties for marketing purposes.</p>

        <h2>6. Retention Periods</h2>
        <ul>
          <li>Booking and payment data &mdash; 5 years after transaction (accounting requirements)</li>
          <li>Communication history &mdash; 2 years</li>
          <li>
            <strong>Safety waiver and consent records</strong> &mdash; 10 years from the activity date.
            Legal basis: legitimate interest &mdash; the right to defend legal claims (GDPR Art. 6(1)(f)).
            These records include name, email address, and IP address at time of consent.
          </li>
        </ul>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request erasure (where no legal obligation to retain applies)</li>
          <li>Restrict processing</li>
          <li>Object to processing on legitimate interests grounds</li>
          <li>Lodge a complaint with the Data State Inspectorate of Latvia (<a href="https://www.dvi.gov.lv" target="_blank" rel="noopener noreferrer">dvi.gov.lv</a>)</li>
        </ul>

        <h2>8. Cookies</h2>
        <p>
          Our website uses only technically necessary cookies. We do not use marketing or analytics
          cookies without your consent.
        </p>

        <h2>9. Contact</h2>
        <p>
          For questions or requests regarding your personal data, contact us:<br />
          Email: <a href="mailto:info@laivunoma.com">info@laivunoma.com</a><br />
          Phone: <a href="tel:+37129211634">+371 29 211 634</a>
        </p>
      </div>
    </main>
  )
}
