import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'

export const revalidate = 3600

export const WAIVER_VERSION = 'v1.0-2026-04-01'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isLv = locale !== 'en'
  const title = isLv ? `Drošības Apliecinājums | ${SITE_NAME}` : `Safety Waiver | ${SITE_NAME}`
  const description = isLv
    ? 'Drošības apliecinājums un atbildības atteikums laivas nomas pakalpojumiem. Versija v1.0.'
    : 'Safety waiver and liability release for boat rental activities. Version v1.0.'
  return {
    title, description,
    alternates: buildAlternates('/waiver'),
    openGraph: buildOpenGraph({ locale, title, description, path: '/waiver' }),
    twitter: twitterCard,
  }
}

export default async function WaiverPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isLv = locale !== 'en'

  if (isLv) {
    return (
      <main className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h1>Drošības Apliecinājums un Atbildības Atteikums</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Versija: {WAIVER_VERSION}
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: 14 }}>
            Šis apliecinājums stājas spēkā brīdī, kad aizpilda rezervācijas formu un apstiprina, ka ar to ir iepazinies.
          </p>

          <h2>1. Pakalpojuma raksturs</h2>
          <p>
            SIA „Mučas" nodrošina laivas un aprīkojumu pašvadāmiem ūdens tūrisma braucieniem.
            <strong> SIA „Mučas" darbinieki vai gidi nepavada dalībniekus uz ūdens.</strong> Pēc aprīkojuma nodošanas
            un drošības instruktāžas dalībnieki turpina maršrutu patstāvīgi, uz savu atbildību.
          </p>

          <h2>2. Riska apzināšanās</h2>
          <p>
            Dalībnieks apzinās un pieņem, ka ūdens tūrisms ietver dabiskus riskus, tostarp, bet ne tikai:
          </p>
          <ul>
            <li>Apgāšanās un iekrišana ūdenī</li>
            <li>Auksta ūdens šoks un hipotermija</li>
            <li>Noslīkšana</li>
            <li>Fizisks ievainojums (sadursmes ar šķēršļiem, akmeņiem, krastiem)</li>
            <li>Straujāka straume nekā gaidīts</li>
            <li>Nogurums, dezorientācija vai panikā</li>
            <li>Laika apstākļu izmaiņas</li>
            <li>Smagas traumas vai nāve</li>
          </ul>
          <p>
            Šie riski pastāv arī mierīgās un seklu upē. Dalībnieks apzinās, ka brauciena laikā
            uz ūdens <strong>netiks klāt SIA „Mučas" darbinieki</strong>.
          </p>

          <h2>3. Drošības noteikumi</h2>
          <p>Dalībniekam ir pienākums ievērot šādus noteikumus visā brauciena laikā:</p>
          <ul>
            <li>
              <strong>Glābšanas veste jāvelk visu laiku uz ūdens.</strong> Bez izņēmumiem.
              Neatbilstošs izmantošanas gadījumā SIA „Mučas" atbildība pilnīgi tiek atcelta.
            </li>
            <li>
              <strong>Alkohols un narkotikas ir pilnīgi aizliegtas</strong> pirms un brauciena laikā.
              Ja SIA „Mučas" darbinieki piefiksē šo noteikumu pārkāpumu aprīkojuma nodošanas brīdī,
              brauciens tiek atteikts bez atmaksas.
            </li>
            <li>
              Drošības instruktāža, ko sniedz SIA „Mučas" darbinieki aprīkojuma nodošanas brīdī,
              ir jāuzklausa uzmanīgi un jāievēro.
            </li>
            <li>
              Brauciens jāveic tikai apstiprinātajā maršrutā, nepametot to bez pamatota iemesla.
            </li>
          </ul>

          <h2>4. Aprīkojuma atbildība</h2>
          <p>
            Dalībnieks ir pilnīgi finansiāli atbildīgs par bojātu, pazaudētu vai iznīcinātu
            SIA „Mučas" aprīkojumu, tostarp laivām, airiem, glābšanas vestēm un citiem piederumiem.
            Atlīdzība tiek noteikta pēc tirgus cenas vai remonta izmaksām - atkarībā no tā, kurš ir
            mazāks.
          </p>

          <h2>5. Atcelšana un ārkārtas apstākļi</h2>
          <p>
            SIA „Mučas" patur tiesības mainīt vai atcelt braucienu jebkurā brīdī drošības apsvērumu dēļ
            (laika apstākļi, ūdens līmenis, utt.). Šāds atcelšanas gadījums ir force majeure un
            netiek uzskatīts par pakalpojuma nesniegšanu. Atmaksas nosacījumi ir reglamentēti
            Pakalpojumu sniegšanas noteikumos.
          </p>

          <h2>6. Atbildības atteikums</h2>
          <p>
            Ar šī apliecinājuma apstiprināšanu dalībnieks <strong>atsakās no prasījumiem</strong> pret
            SIA „Mučas" (reģ. nr. LV40103263487), tā darbiniekiem un pilnvarotajiem pārstāvjiem par:
          </p>
          <ul>
            <li>Ievainojumiem, slimībām vai nāvi, kas radusies no ūdens tūrisma dabiskajiem riskiem</li>
            <li>Zaudējumiem vai bojājumiem, kas radušies dalībnieka paša rīcības vai nolaidības dēļ</li>
            <li>Zaudējumiem, kas radušies drošības noteikumu neievērošanas dēļ</li>
            <li>Zaudējumiem, kas radušies no laika apstākļiem vai citiem ārējiem apstākļiem</li>
          </ul>
          <p>
            <strong>Šis atteikums neattiecas uz SIA „Mučas" vai tā darbinieku rupjas nolaidības gadījumiem.</strong>
          </p>

          <h2>7. Fiziskās spējas apliecinājums</h2>
          <p>
            Rezervējot braucienu, dalībnieks apliecina, ka ir pietiekami vesels un fiziski spējīgs
            piedalīties ūdens tūrisma aktivitātē, un nav informēts par medicīnisku stāvokli,
            kas varētu padarīt šo aktivitāti bīstamu viņam vai citiem.
          </p>

          <h2>8. Nepilngadīgie dalībnieki</h2>
          <p>
            Ja rezervācijā ir iekļauti dalībnieki, kas jaunāki par 18 gadiem, rezervācijas veicējs
            apliecina, ka ir to likumiskais aizbildnis vai ir saņēmis rakstveida aizbildņa atļauju,
            un uzņemas pilnu juridisko atbildību par šiem dalībniekiem.
          </p>

          <h2>9. Juridiskais spēks</h2>
          <p>
            Šis apliecinājums ir juridiski saistošs dokuments. Rezervācijas formas aizpildīšana un
            apstiprināšana ir uzskatāma par dalībnieka elektronisku parakstu un piekrišanu visiem
            šā dokumenta noteikumiem. Piekrišanas fakts, laiks un versija tiek reģistrēti mūsu sistēmā.
          </p>

          <p style={{ marginTop: '2rem', fontSize: 13, color: 'var(--text-secondary)' }}>
            Jautājumu gadījumā: <a href="mailto:info@laivunoma.com">info@laivunoma.com</a> |{' '}
            <a href="tel:+37129211634">+371 29 211 634</a>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1>Safety Waiver and Liability Release</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          Version: {WAIVER_VERSION}
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: 14 }}>
          This waiver takes effect when you complete the booking form and confirm you have read it.
        </p>

        <h2>1. Nature of the Activity</h2>
        <p>
          SIA &ldquo;Mučas&rdquo; provides boats and equipment for self-guided water touring trips.
          <strong> SIA &ldquo;Mučas&rdquo; staff do not accompany participants on the water.</strong> After
          equipment handover and a safety briefing, participants continue the route independently,
          at their own risk.
        </p>

        <h2>2. Acknowledgment of Risk</h2>
        <p>
          The participant acknowledges and accepts that water-based activities involve inherent risks,
          including but not limited to:
        </p>
        <ul>
          <li>Capsizing and falling into the water</li>
          <li>Cold water shock and hypothermia</li>
          <li>Drowning</li>
          <li>Physical injury from collision with obstacles, rocks, or banks</li>
          <li>Stronger currents than anticipated</li>
          <li>Exhaustion, disorientation, or panic</li>
          <li>Rapid changes in weather conditions</li>
          <li>Serious injury or death</li>
        </ul>
        <p>
          These risks exist even on calm, shallow rivers. The participant acknowledges that
          <strong> no SIA &ldquo;Mučas&rdquo; staff will be present on the water</strong> during the trip.
        </p>

        <h2>3. Safety Rules</h2>
        <p>
          The participant is obligated to follow these rules throughout the entire trip:
        </p>
        <ul>
          <li>
            <strong>Life jackets must be worn at all times on the water.</strong> No exceptions.
            Failure to comply fully releases SIA &ldquo;Mučas&rdquo; from any resulting liability.
          </li>
          <li>
            <strong>Alcohol and drugs are strictly prohibited</strong> before and during the activity.
            If SIA &ldquo;Mučas&rdquo; staff observe a violation at equipment handover, the trip will
            be refused with no refund.
          </li>
          <li>
            The safety briefing provided by SIA &ldquo;Mučas&rdquo; staff at equipment handover must
            be listened to carefully and followed.
          </li>
          <li>
            The trip must be completed on the agreed route only, without deviating without
            good reason.
          </li>
        </ul>

        <h2>4. Equipment Responsibility</h2>
        <p>
          The participant is fully financially responsible for any damaged, lost, or destroyed
          SIA &ldquo;Mučas&rdquo; equipment, including boats, paddles, life jackets, and accessories.
          Compensation is set at market replacement value or repair cost, whichever is lower.
        </p>

        <h2>5. Cancellation and Force Majeure</h2>
        <p>
          SIA &ldquo;Mučas&rdquo; reserves the right to modify or cancel a trip at any time on safety
          grounds (weather, water levels, etc.). Such cancellations constitute force majeure and are
          not considered a failure to deliver the service. Refund conditions are governed by the
          Terms of Service.
        </p>

        <h2>6. Release of Liability</h2>
        <p>
          By confirming this waiver, the participant <strong>releases all claims</strong> against
          SIA &ldquo;Mučas&rdquo; (reg. no. LV40103263487), its employees, and authorised representatives for:
        </p>
        <ul>
          <li>Injury, illness, or death arising from the inherent risks of water-based activities</li>
          <li>Loss or damage caused by the participant&apos;s own actions or negligence</li>
          <li>Loss or damage caused by failure to follow safety rules</li>
          <li>Loss or damage caused by weather or other external circumstances</li>
        </ul>
        <p>
          <strong>This release does not apply in cases of gross negligence by SIA &ldquo;Mučas&rdquo; or its staff.</strong>
        </p>

        <h2>7. Physical Fitness Declaration</h2>
        <p>
          By booking, the participant declares that they are in sufficient health and physical
          condition to participate in a water-based outdoor activity, and are not aware of any
          medical condition that would make this activity dangerous for them or others.
        </p>

        <h2>8. Participants Under 18</h2>
        <p>
          If the booking includes participants under 18 years of age, the person making the booking
          declares that they are the legal guardian of those participants, or hold written guardian
          permission, and accepts full legal responsibility for them.
        </p>

        <h2>9. Legal Effect</h2>
        <p>
          This waiver is a legally binding document. Completing and submitting the booking form
          constitutes the participant&apos;s electronic signature and agreement to all terms contained
          herein. The fact, time, and version of consent are recorded in our system.
        </p>

        <p style={{ marginTop: '2rem', fontSize: 13, color: 'var(--text-secondary)' }}>
          Questions: <a href="mailto:info@laivunoma.com">info@laivunoma.com</a> |{' '}
          <a href="tel:+37129211634">+371 29 211 634</a>
        </p>
      </div>
    </main>
  )
}
