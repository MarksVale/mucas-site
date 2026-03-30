import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isLv = locale !== 'en'
  const title = isLv ? `Lietošanas Noteikumi | ${SITE_NAME}` : `Terms of Service | ${SITE_NAME}`
  const description = isLv
    ? 'SIA Mučas pakalpojumu sniegšanas, rezervācijas un maksājumu noteikumi.'
    : 'SIA Mučas booking, payment and service delivery terms.'
  return {
    title, description,
    alternates: buildAlternates('/terms'),
    openGraph: buildOpenGraph({ locale, title, description, path: '/terms' }),
    twitter: twitterCard,
  }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isLv = locale !== 'en'

  if (isLv) {
    return (
      <main className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h1>Pakalpojumu Sniegšanas Noteikumi</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Spēkā no: 2026. gada 1. aprīļa
          </p>

          <h2>1. Vispārīgi noteikumi</h2>
          <p>
            Šie noteikumi regulē attiecības starp SIA „Mučas" (turpmāk — Uzņēmums) un klientiem,
            kas izmanto laivas nomas pakalpojumus vietnē <a href="https://laivunoma.com">laivunoma.com</a>.
            Veicot rezervāciju vai apmaksājot pakalpojumu, klients apliecina, ka ir iepazinies ar šiem
            noteikumiem un tiem piekrīt.
          </p>
          <p>
            Uzņēmums: SIA „Mučas", Reģ. Nr. LV40103263487, Jāņa Čakstes 1-41, Sigulda, LV-2150.<br />
            E-pasts: <a href="mailto:info@laivunoma.com">info@laivunoma.com</a> |
            Tālrunis: <a href="tel:+37129211634">+371 29 211 634</a>
          </p>

          <h2>2. Rezervācija</h2>
          <p>
            Rezervācija tiek uzskatīta par apstiprinātu pēc sekmīgas apmaksas vai rakstiska apstiprinājuma
            no Uzņēmuma puses. Rezervāciju var veikt, izmantojot vietnes rezervācijas formu, zvanot pa
            tālruni vai rakstot uz e-pastu.
          </p>
          <p>
            Uzņēmums patur tiesības atteikt rezervāciju laikapstākļu, drošības apsvērumu vai citu
            pamatotu iemeslu dēļ, informējot klientu pēc iespējas ātrāk.
          </p>

          <h2>3. Cenas un maksājumi</h2>
          <p>
            Visas cenas norādītas euro, ieskaitot pievienotās vērtības nodokli (PVN), ja tas ir piemērojams.
          </p>
          <p>Maksājumus var veikt:</p>
          <ul>
            <li>Tiešsaistē ar Latvijas banku pārskaitījumu (Swedbank, SEB, Citadele, Luminor)</li>
            <li>Ar bankas karti (Visa, Mastercard)</li>
            <li>Ar mobilajiem maksājumiem (Apple Pay, Google Pay)</li>
          </ul>
          <p>
            Maksājumu apstrādi nodrošina maksājumu platforma{' '}
            <a href="https://makecommerce.lv" target="_blank" rel="noopener noreferrer">makecommerce.lv</a>.
            Maksājumu drošību garantē Maksekeskus AS (Igaunija). Tiešsaistes maksājumi tiek
            apstrādāti drošā vidē, un Uzņēmums nesaglabā kartes datus.
          </p>
          <p>
            Klients var arī norēķināties skaidrā naudā vai ar pārskaitījumu tieši uz Uzņēmuma
            bankas kontu: IBAN LV90UNLA0055005842535 (A/S SEB banka, UNLALV2X).
          </p>

          <h2>4. Pakalpojuma saņemšana</h2>
          <p>Pakalpojumu var saņemt divējādi:</p>
          <ul>
            <li>
              <strong>Pašsaņemšana:</strong> Klients ierodas Uzņēmuma bāzē Jāņa Čakstes 1-41, Sigulda,
              norādītajā laikā. Laivas nodošana notiek pēc inventāra pārbaudes un drošības instruktāžas.
            </li>
            <li>
              <strong>Piegāde uz upes izejas punktu:</strong> Par papildu samaksu Uzņēmums nogādā
              laivas uz norādīto maršruta sākumpunktu. Piegādes cena tiek saskaņota rezervācijas laikā.
            </li>
          </ul>
          <p>
            Klientam jāierodas norādītajā vietā un laikā. Nokavēts ierašanās laiks bez brīdinājuma
            var tikt uzskatīts par rezervācijas atteikumu, un atmaksa netiks veikta.
          </p>

          <h2>5. Atcelšana un pārcelšana</h2>
          <p>
            <strong>Atmaksa netiek veikta.</strong> Apmaksātus pakalpojumus nav iespējams atcelt
            un saņemt naudas atpakaļ.
          </p>
          <p>
            Tomēr klients var <strong>pārcelt rezervāciju</strong> uz citu datumu, ja par to paziņo
            vismaz 48 stundas pirms plānotā pasākuma, zvanot vai rakstot uz e-pastu. Pārcelšana
            tiek veikta atbilstoši pieejamībai un tikai vienu reizi uz vienu rezervāciju.
          </p>
          <p>
            Ārkārtas apstākļos (nopietna slimība, nelaimīgs gadījums) Uzņēmums izskatīs katru
            gadījumu individuāli.
          </p>

          <h2>6. Drošība un atbildība</h2>
          <p>
            Klients apņemas ievērot Uzņēmuma drošības noteikumus, lietot glābšanas vestes un
            nerīkoties alkohola vai citu vielu ietekmē. Uzņēmums neatbild par bojājumiem vai
            negadījumiem, kas radušies klienta vainas dēļ.
          </p>
          <p>
            Bojāta vai pazaudēta inventāra (laivas, airas, glābšanas vestes) gadījumā klients
            atlīdzina Uzņēmumam tirgus vērtību vai remonta izmaksas.
          </p>

          <h2>7. Sūdzību izskatīšana</h2>
          <p>
            Sūdzības lūdzam iesniegt rakstiski uz e-pastu{' '}
            <a href="mailto:info@laivunoma.com">info@laivunoma.com</a>.
            Mēs apņemamies atbildēt 5 darba dienu laikā. Ja strīdu nav iespējams atrisināt
            savstarpēji, klients ir tiesīgs vērsties Patērētāju tiesību aizsardzības centrā
            (<a href="https://www.ptac.gov.lv" target="_blank" rel="noopener noreferrer">ptac.gov.lv</a>).
          </p>

          <h2>8. Grozījumi</h2>
          <p>
            Uzņēmums patur tiesības mainīt šos noteikumus. Grozījumi stājas spēkā pēc to
            publicēšanas vietnē. Par būtiskām izmaiņām klienti tiks informēti.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1>Terms of Service</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Effective date: 1 April 2026
        </p>

        <h2>1. General</h2>
        <p>
          These terms govern the relationship between SIA &ldquo;Mučas&rdquo; (hereinafter &ldquo;the Company&rdquo;)
          and customers using boat rental services at{' '}
          <a href="https://laivunoma.com">laivunoma.com</a>.
          By making a booking or completing a payment, the customer confirms they have read and
          agree to these terms.
        </p>
        <p>
          Company: SIA &ldquo;Mučas&rdquo;, Reg. No. LV40103263487, Jāņa Čakstes 1-41, Sigulda, LV-2150, Latvia.<br />
          Email: <a href="mailto:info@laivunoma.com">info@laivunoma.com</a> |
          Phone: <a href="tel:+37129211634">+371 29 211 634</a>
        </p>

        <h2>2. Booking</h2>
        <p>
          A booking is confirmed upon successful payment or written confirmation from the Company.
          Bookings can be made via the website booking form, by phone, or by email.
        </p>
        <p>
          The Company reserves the right to decline a booking due to weather conditions, safety
          concerns, or other justified reasons, notifying the customer as soon as possible.
        </p>

        <h2>3. Prices and Payment</h2>
        <p>
          All prices are in euros and include VAT where applicable.
        </p>
        <p>Accepted payment methods:</p>
        <ul>
          <li>Online Latvian bank transfer (Swedbank, SEB, Citadele, Luminor)</li>
          <li>Card payment (Visa, Mastercard)</li>
          <li>Mobile payments (Apple Pay, Google Pay)</li>
        </ul>
        <p>
          Payment processing is provided by payment platform{' '}
          <a href="https://makecommerce.lv" target="_blank" rel="noopener noreferrer">makecommerce.lv</a>.
          Payment security is guaranteed by Maksekeskus AS (Estonia). Online payments are processed
          in a secure environment and the Company does not store card data.
        </p>
        <p>
          Customers may also pay by cash or direct bank transfer to: IBAN LV90UNLA0055005842535
          (A/S SEB banka, UNLALV2X).
        </p>

        <h2>4. Service Delivery</h2>
        <p>Services can be received in two ways:</p>
        <ul>
          <li>
            <strong>Self-pickup:</strong> The customer arrives at the Company&apos;s base at Jāņa Čakstes 1-41,
            Sigulda at the agreed time. Equipment is handed over after an inventory check and safety briefing.
          </li>
          <li>
            <strong>Delivery to river start point:</strong> For an additional fee, the Company delivers
            the equipment to the specified route starting point. Delivery pricing is agreed at the time
            of booking.
          </li>
        </ul>
        <p>
          The customer must arrive at the agreed location and time. Failure to appear without prior
          notice may be treated as a cancellation and no refund will be issued.
        </p>

        <h2>5. Cancellation and Rescheduling</h2>
        <p>
          <strong>No refunds are issued.</strong> Once a booking has been paid, it cannot be cancelled
          for a refund.
        </p>
        <p>
          However, customers may <strong>reschedule</strong> their booking to a different date, provided
          they notify the Company at least 48 hours before the planned activity by phone or email.
          Rescheduling is subject to availability and is permitted once per booking.
        </p>
        <p>
          In exceptional circumstances (serious illness, accident), the Company will review each
          case individually.
        </p>

        <h2>6. Safety and Liability</h2>
        <p>
          Customers agree to follow the Company&apos;s safety guidelines, wear life jackets, and not
          participate under the influence of alcohol or other substances. The Company is not liable
          for damage or incidents resulting from customer negligence.
        </p>
        <p>
          In the event of damaged or lost equipment (boats, paddles, life jackets), the customer
          is responsible for reimbursing the Company for the market value or repair costs.
        </p>

        <h2>7. Complaints</h2>
        <p>
          Complaints should be submitted in writing to{' '}
          <a href="mailto:info@laivunoma.com">info@laivunoma.com</a>.
          We aim to respond within 5 business days. If a dispute cannot be resolved amicably,
          the customer may contact the Consumer Rights Protection Centre of Latvia (
          <a href="https://www.ptac.gov.lv" target="_blank" rel="noopener noreferrer">ptac.gov.lv</a>).
        </p>

        <h2>8. Amendments</h2>
        <p>
          The Company reserves the right to update these terms. Changes take effect upon publication
          on the website. Customers will be notified of material changes.
        </p>
      </div>
    </main>
  )
}
