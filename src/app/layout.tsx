import 'leaflet/dist/leaflet.css'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { getSiteSettings, buildDesignTokenCSS } from '@/lib/sanity'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

export const revalidate = 30   // re-fetch Sanity data every 30 s

const SITE_URL = 'https://mucas-site.vercel.app'

export const metadata: Metadata = {
  title: 'Mučas Laivu Noma — Boat Rentals on Latvia\'s Rivers',
  description: 'Rent kayaks, canoes, and rafts for unforgettable river adventures across Latvia. 4 rivers, 29 routes — from beginner-friendly to multi-day expeditions.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Mučas Laivu Noma — Boat Rentals on Latvia\'s Rivers',
    description: 'Kayaks, canoes, and rafts on the Gauja, Salaca, Brasla, and Amata rivers. Book your river adventure today.',
    url: SITE_URL,
    siteName: 'Mučas Laivu Noma',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://res.cloudinary.com/mucas/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/mucas/rivers/gauja/hero',
      width: 1200,
      height: 630,
      alt: 'River paddling on the Gauja in Latvia',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mučas Laivu Noma — Boat Rentals on Latvia\'s Rivers',
    description: 'Kayaks, canoes, and rafts on 4 Latvian rivers. Book your adventure.',
    images: ['https://res.cloudinary.com/mucas/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/mucas/rivers/gauja/hero'],
  },
  icons: {
    icon: '/icon.svg',
  },
}

// JSON-LD structured data for LocalBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Mučas Laivu Noma',
  description: 'Boat rental service offering kayaks, canoes, and rafts for river adventures across Latvia.',
  url: SITE_URL,
  telephone: '+37129211634',
  email: 'info@laivunoma.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jāņa Čakstes 1-41',
    addressLocality: 'Sigulda',
    postalCode: 'LV-2150',
    addressCountry: 'LV',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 57.1519,
    longitude: 24.8647,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '€€',
  image: 'https://res.cloudinary.com/mucas/image/upload/q_auto,f_auto/mucas/rivers/gauja/hero',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const designTokenCSS = buildDesignTokenCSS(settings.designTokens)

  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {designTokenCSS && (
          <style dangerouslySetInnerHTML={{ __html: designTokenCSS }} />
        )}
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
