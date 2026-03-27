import type { River, Route } from '@/lib/airtable'

// ---- Site Settings ----
export interface SiteSettings {
  brandName: string
  brandNameShort: string
  tagline: string
  phone: string
  email: string
  address: string
  colorPrimary: string
  colorAccent: string
  colorDark: string
  colorBackground: string
}

const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'Mučas Laivu Noma',
  brandNameShort: 'MUČAS',
  tagline: 'Boat Rentals on Latvia\'s Rivers',
  phone: '+371 29211634',
  email: 'info@laivunoma.com',
  address: 'Jāņa Čakstes 1-41, Sigulda, LV-2150',
  colorPrimary: '#24943A',
  colorAccent: '#E7B236',
  colorDark: '#191716',
  colorBackground: '#F6F6F4',
}

export async function getSettings(): Promise<SiteSettings> {
  return DEFAULT_SETTINGS
}

export interface Highlight {
  name: string
  desc: string
}

export interface RiverContent {
  description: string
  highlights: Highlight[]
  region: string
  season: string
  totalLength: number
  priceFrom: number
  photoUrl: string
  galleryCount?: number
}

export interface RouteContent {
  description: string
  highlights: Highlight[]
  difficulty: string
  km: number
  hours: string
  photoUrl: string
  photos?: string[]
  galleryCount?: number
  startLat?: number
  startLng?: number
  endLat?: number
  endLng?: number
}

export function getRiverContent(river: River): RiverContent {
  return {
    description: river.description,
    highlights: river.highlights,
    region: river.region,
    season: river.season,
    totalLength: river.totalLength,
    priceFrom: river.priceFrom,
    photoUrl: '',
    galleryCount: river.galleryCount,
  }
}

export function getRouteContent(route: Route): RouteContent {
  return {
    description: route.description,
    highlights: route.highlights,
    difficulty: route.difficulty,
    km: route.km,
    hours: route.hours,
    photoUrl: '',
    galleryCount: 0,
    startLat: route.startLat || undefined,
    startLng: route.startLng || undefined,
    endLat: route.endLat || undefined,
    endLng: route.endLng || undefined,
  }
}

// =========================================================
//  PAGE CONTENT — hardcoded defaults (EN + LV)
// =========================================================

// ---- Home Page ----
export interface HomePageContent {
  heroBadge: string
  heroHeading: string
  heroSubtitle: string
  heroBtn1: string
  heroBtn2: string
  riversLabel: string
  riversHeading: string
  riversSubtitle: string
  riversBtnLabel: string
  howLabel: string
  howHeading: string
  howSubtitle: string
  howSteps: { title: string; description: string }[]
  routesLabel: string
  routesHeading: string
  routesSubtitle: string
  whyLabel: string
  whyHeading: string
  whyFeatures: { icon: string; title: string; description: string }[]
  testimonialsLabel: string
  testimonialsHeading: string
  testimonials: { text: string; author: string; source: string }[]
  ctaHeading: string
  ctaSubtitle: string
  ctaBtn1: string
  ctaBtn2: string
}

const DEFAULT_HOME_EN: HomePageContent = {
  heroBadge: 'Season 2026 Now Open',
  heroHeading: "Explore Latvia's Rivers by Boat",
  heroSubtitle: 'Rent kayaks, canoes, and rafts for unforgettable river adventures across Latvia.',
  heroBtn1: 'Browse Routes',
  heroBtn2: 'How It Works',
  riversLabel: 'Discover',
  riversHeading: 'Our Rivers',
  riversSubtitle: 'Choose your river and find the perfect route',
  riversBtnLabel: 'View All Rivers →',
  howLabel: 'Simple',
  howHeading: 'How It Works',
  howSubtitle: 'From choosing your route to paddling — we make it effortless',
  howSteps: [
    { title: 'Choose Your Route', description: 'Browse routes across 4 rivers. Pick by river, duration, or group size.' },
    { title: 'Pick Your Boat', description: 'Kayaks, canoes, rafts, or SUPs. Solo or group — we have many boat types.' },
    { title: 'Book Online', description: 'Select your date and start time. Instant confirmation. Secure payment.' },
    { title: 'Paddle & Enjoy', description: 'We handle gear, transport, and safety. You just enjoy the river.' },
  ],
  routesLabel: 'Top Picks',
  routesHeading: 'Popular Routes',
  routesSubtitle: 'Most booked trips this season',
  whyLabel: 'Why Us',
  whyHeading: 'Why Choose Mučas',
  whyFeatures: [
    { icon: '🛡️', title: 'Safety First', description: 'All equipment inspected. Safety briefing before every trip.' },
    { icon: '🚐', title: 'Full Logistics', description: 'Shuttle service and boat transport — we handle everything.' },
    { icon: '💬', title: 'Local Expertise', description: 'Our team knows every river and every route.' },
    { icon: '👨‍👩‍👧‍👦', title: 'Family Friendly', description: 'Routes and boats for all ages and group sizes.' },
  ],
  testimonialsLabel: 'Reviews',
  testimonialsHeading: 'What Our Guests Say',
  testimonials: [
    { text: 'Amazing experience on the Gauja! The team was super helpful, equipment was great, and the scenery was breathtaking.', author: 'Laura K.', source: 'Google Reviews' },
    { text: 'Perfect family trip. Kids loved it! The route was easy and safe, and the camping spot was beautiful.', author: 'Māris B.', source: 'TripAdvisor' },
    { text: '2-day trip on the Salaca. Great rapids, beautiful nature, and the shuttle service made logistics so easy. 10/10.', author: 'Anna & Jānis', source: 'Google Reviews' },
  ],
  ctaHeading: 'Ready for Your River Adventure?',
  ctaSubtitle: 'Browse routes, pick your boat, and book. Season 2026 is open!',
  ctaBtn1: 'Browse All Routes',
  ctaBtn2: 'Book Now',
}

const DEFAULT_HOME_LV: HomePageContent = {
  heroBadge: '2026. gada sezona atvērta',
  heroHeading: 'Izpēti Latvijas Upes ar Laivu',
  heroSubtitle: 'Izīrē kajaki, kanoe un plostus neaizmirstamām upes braucienu pieredzēm visā Latvijā.',
  heroBtn1: 'Skatīt Maršrutus',
  heroBtn2: 'Kā Tas Darbojas',
  riversLabel: 'Atklāj',
  riversHeading: 'Mūsu Upes',
  riversSubtitle: 'Izvēlies savu upi un atrodi ideālo maršrutu',
  riversBtnLabel: 'Visas Upes →',
  howLabel: 'Vienkārši',
  howHeading: 'Kā Tas Darbojas',
  howSubtitle: 'No maršruta izvēles līdz airēšanai — mēs padarām to bez piepūles',
  howSteps: [
    { title: 'Izvēlies Maršrutu', description: 'Pārlūko maršrutus pa upēm. Izvēlies pēc upes, ilguma vai grupas lieluma.' },
    { title: 'Izvēlies Laivu', description: 'Kajaki, kanoe, plosti vai SUP. Vienatnē vai grupā — mums ir daudz laivu veidu.' },
    { title: 'Rezervē Tiešsaistē', description: 'Izvēlies datumu un sākuma laiku. Tūlītējs apstiprinājums. Droša maksājumu.' },
    { title: 'Airē un Baudi', description: 'Mēs rūpējamies par inventāru, transportu un drošību. Tu vienkārši baudi upi.' },
  ],
  routesLabel: 'Populārie',
  routesHeading: 'Populārie Maršruti',
  routesSubtitle: 'Visvairāk rezervētie braucieni šosezon',
  whyLabel: 'Kāpēc Mēs',
  whyHeading: 'Kāpēc Izvēlēties Mučas',
  whyFeatures: [
    { icon: '🛡️', title: 'Drošība Pirmajā Vietā', description: 'Viss inventārs pārbaudīts. Drošības instruktāža pirms katra brauciena.' },
    { icon: '🚐', title: 'Pilna Loģistika', description: 'Transporta pakalpojums un laivu pārvadāšana — mēs rūpējamies par visu.' },
    { icon: '💬', title: 'Vietēja Kompetence', description: 'Mūsu komanda pazīst katru upi un katru maršrutu.' },
    { icon: '👨‍👩‍👧‍👦', title: 'Ģimenēm Piemērots', description: 'Maršruti un laivas visiem vecumiem un grupas lielumiem.' },
  ],
  testimonialsLabel: 'Atsauksmes',
  testimonialsHeading: 'Ko Saka Mūsu Viesi',
  testimonials: [
    { text: 'Lieliska pieredze uz Gaujas! Komanda bija ļoti palīdzīga, inventārs labs, un skati bija elpu aizraujošas.', author: 'Laura K.', source: 'Google Reviews' },
    { text: 'Ideāls ģimenes brauciens. Bērniem ļoti patika! Maršruts bija viegls un drošs, un kempinga vieta — skaista.', author: 'Māris B.', source: 'TripAdvisor' },
    { text: '2 dienu brauciens pa Salacu. Lieliskas krāces, skaista daba, un transporta pakalpojums padarīja loģistiku tik vienkāršu. 10/10.', author: 'Anna & Jānis', source: 'Google Reviews' },
  ],
  ctaHeading: 'Gatavs Upes Piedzīvojumam?',
  ctaSubtitle: 'Pārlūko maršrutus, izvēlies laivu un rezervē. 2026. gada sezona ir atvērta!',
  ctaBtn1: 'Visi Maršruti',
  ctaBtn2: 'Rezervēt',
}

export async function getHomePage(locale = 'lv'): Promise<HomePageContent> {
  return locale === 'en' ? DEFAULT_HOME_EN : DEFAULT_HOME_LV
}

// ---- About Page ----
export interface AboutPageContent {
  heroHeading: string
  heroSubtitle: string
  storyHeading: string
  storyText: string
  valuesLabel: string
  valuesHeading: string
  values: { icon: string; title: string; description: string }[]
  numbersLabel: string
  numbersHeading: string
  stats: { value: string; label: string }[]
  ctaHeading: string
  ctaSubtitle: string
  ctaBtn1: string
  ctaBtn2: string
}

const DEFAULT_ABOUT_EN: AboutPageContent = {
  heroHeading: 'About Mučas',
  heroSubtitle: "Making Latvia's rivers accessible to everyone since 2020",
  storyHeading: 'Our Story',
  storyText: "Mučas Laivu Noma started with a simple idea: Latvia has some of the most beautiful rivers in the Baltics, but getting out on the water shouldn't be complicated. We built a service that handles all the logistics — boats, gear, transport — so you can focus on what matters: enjoying the river.\n\nBased in Cēsis, in the heart of Gauja National Park, we now operate across 21 rivers with over 110 routes. From gentle family floats on the Abava to exciting rapids on the Salaca, we have something for every skill level and adventure appetite.",
  valuesLabel: 'Values',
  valuesHeading: 'What We Stand For',
  values: [
    { icon: '🌍', title: 'Respect for Nature', description: 'We follow leave-no-trace principles and actively maintain the rivers and camping spots we use. Every trip includes a waste bag.' },
    { icon: '🤝', title: 'Local Community', description: 'We partner with local farmers, guesthouses, and guides along every river. Your trip supports the rural economy.' },
    { icon: '🛡️', title: 'Safety Always', description: 'Every paddler gets a safety briefing, life jacket, and waterproof emergency contact card. We monitor weather and water levels daily.' },
    { icon: '♿', title: 'Accessibility', description: 'We offer adapted boats and assisted launch for paddlers with mobility challenges on selected routes.' },
  ],
  numbersLabel: 'Impact',
  numbersHeading: 'Mučas in Numbers',
  stats: [
    { value: '5,000+', label: 'Happy paddlers' },
    { value: '21', label: 'Rivers' },
    { value: '110', label: 'Routes' },
    { value: '6', label: 'Seasons' },
  ],
  ctaHeading: 'Come Paddle With Us',
  ctaSubtitle: "Questions? Want to plan a group trip? We'd love to hear from you.",
  ctaBtn1: 'Get in Touch',
  ctaBtn2: 'Browse Rivers',
}

const DEFAULT_ABOUT_LV: AboutPageContent = {
  heroHeading: 'Par Mučas',
  heroSubtitle: 'Padarām Latvijas upes pieejamas ikvienam kopš 2020. gada',
  storyHeading: 'Mūsu Stāsts',
  storyText: "Mučas Laivu Noma sākās ar vienkāršu ideju: Latvijā ir dažas no skaistākajām upēm Baltijā, bet nokļūt uz ūdens nevajadzētu būt sarežģīti. Mēs izveidojām pakalpojumu, kas rūpējas par visu loģistiku — laivām, inventāru, transportu — lai jūs varētu koncentrēties uz galveno: baudīt upi.\n\nMēs atrodamies Cēsīs, Gaujas Nacionālā parka sirdī, un tagad strādājam 21 upē ar vairāk nekā 110 maršrutiem. No mierīgiem ģimenes braucieniem pa Abavu līdz aizraujošām krācēm uz Salacas — mums ir kas piemērots katram prasmju līmenim un piedzīvojumu apetītei.",
  valuesLabel: 'Vērtības',
  valuesHeading: 'Ko Mēs Pārstāvam',
  values: [
    { icon: '🌍', title: 'Cieņa pret Dabu', description: 'Mēs ievērojam "atstāj bez pēdām" principus un aktīvi uzturām upes un kempinga vietas, ko izmantojam. Katrs brauciens ietver atkritumu maisu.' },
    { icon: '🤝', title: 'Vietējā Kopiena', description: 'Mēs sadarbojamies ar vietējiem zemniekiem, viesu namiem un gidiem gar katru upi. Jūsu brauciens atbalsta lauku ekonomiku.' },
    { icon: '🛡️', title: 'Drošība Vienmēr', description: 'Katrs airētājs saņem drošības instruktāžu, glābšanas vesti un ūdensizturīgu ārkārtas kontaktkarti. Mēs katru dienu uzraugām laiku un ūdens līmeņus.' },
    { icon: '♿', title: 'Pieejamība', description: 'Mēs piedāvājam pielāgotas laivas un palīdzētu palaišanu airētājiem ar mobilitātes izaicinājumiem izvēlētos maršrutos.' },
  ],
  numbersLabel: 'Ietekme',
  numbersHeading: 'Mučas Skaitļos',
  stats: [
    { value: '5 000+', label: 'Laimīgi airētāji' },
    { value: '21', label: 'Upes' },
    { value: '110', label: 'Maršruti' },
    { value: '6', label: 'Sezonas' },
  ],
  ctaHeading: 'Nāc Airēt Kopā ar Mums',
  ctaSubtitle: 'Jautājumi? Vēlies plānot grupu braucienu? Mēs labprāt uzklausīsim.',
  ctaBtn1: 'Sazinies',
  ctaBtn2: 'Skatīt Upes',
}

export async function getAboutPage(locale = 'lv'): Promise<AboutPageContent> {
  return locale === 'en' ? DEFAULT_ABOUT_EN : DEFAULT_ABOUT_LV
}

// ---- Contact Page ----
export interface ContactPageContent {
  heroHeading: string
  heroSubtitle: string
  formHeading: string
  formSubtitle: string
  phoneNote: string
  emailNote: string
  locationNote: string
}

const DEFAULT_CONTACT_EN: ContactPageContent = {
  heroHeading: 'Contact Us',
  heroSubtitle: "We're here to help plan your perfect river adventure",
  formHeading: 'Get in Touch',
  formSubtitle: 'Have questions about routes, boats, or group bookings? We respond within 24 hours.',
  phoneNote: 'Mon–Sat, 9:00–18:00 · WhatsApp fastest',
  emailNote: 'We reply within 24h',
  locationNote: 'Gauja National Park area',
}

const DEFAULT_CONTACT_LV: ContactPageContent = {
  heroHeading: 'Kontakti',
  heroSubtitle: 'Esam šeit, lai palīdzētu plānot jūsu perfekto upes piedzīvojumu',
  formHeading: 'Sazinies ar Mums',
  formSubtitle: 'Jautājumi par maršrutiem, laivām vai grupu rezervācijām? Atbildam 24 stundu laikā.',
  phoneNote: 'P–S, 9:00–18:00 · WhatsApp ātrāk',
  emailNote: 'Atbildam 24 stundu laikā',
  locationNote: 'Gaujas Nacionālā parka apkārtne',
}

export async function getContactPage(locale = 'lv'): Promise<ContactPageContent> {
  return locale === 'en' ? DEFAULT_CONTACT_EN : DEFAULT_CONTACT_LV
}

// ---- Booking Page ----
export interface BookingPageContent {
  heroHeading: string
  heroSubtitle: string
}

const DEFAULT_BOOKING_EN: BookingPageContent = {
  heroHeading: 'Book Your Trip',
  heroSubtitle: 'Choose your route, pick your boats, and hit the water',
}

const DEFAULT_BOOKING_LV: BookingPageContent = {
  heroHeading: 'Rezervēt Braucienu',
  heroSubtitle: 'Izvēlies maršrutu, ņem laivu un dodies uz ūdens',
}

export async function getBookingPage(locale = 'lv'): Promise<BookingPageContent> {
  return locale === 'en' ? DEFAULT_BOOKING_EN : DEFAULT_BOOKING_LV
}

// ---- Fleet Page ----
export interface FleetPageContent {
  heroHeading: string
  heroSubtitle: string
  ctaHeading: string
  ctaSubtitle: string
  ctaBtn1: string
  ctaBtn2: string
}

const DEFAULT_FLEET_EN: FleetPageContent = {
  heroHeading: 'Our Fleet',
  heroSubtitle: 'All boats available for your river adventure',
  ctaHeading: 'Ready to Hit the Water?',
  ctaSubtitle: 'Pick a route and book your boat.',
  ctaBtn1: 'Browse Routes',
  ctaBtn2: 'Book Now',
}

const DEFAULT_FLEET_LV: FleetPageContent = {
  heroHeading: 'Mūsu Flote',
  heroSubtitle: 'Visas laivas jūsu upes piedzīvojumam',
  ctaHeading: 'Gatavs Doties Uz Ūdens?',
  ctaSubtitle: 'Izvēlies maršrutu un rezervē laivu.',
  ctaBtn1: 'Skatīt Maršrutus',
  ctaBtn2: 'Rezervēt',
}

export async function getFleetPage(locale = 'lv'): Promise<FleetPageContent> {
  return locale === 'en' ? DEFAULT_FLEET_EN : DEFAULT_FLEET_LV
}
