import 'leaflet/dist/leaflet.css'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { getSiteSettings, buildDesignTokenCSS } from '@/lib/sanity'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import { routing } from '@/i18n/routing'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

export const revalidate = 30

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/icon.svg' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

// Required for next-intl static generation
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!routing.locales.includes(locale as 'lv' | 'en')) notFound()

  const [messages, settings] = await Promise.all([
    getMessages(),
    getSiteSettings(),
  ])
  const designTokenCSS = buildDesignTokenCSS(settings.designTokens)

  const isLv = locale !== 'en'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    description: isLv
      ? 'Laivu nomas pakalpojums - kajaki, kanoe un plosti upes braucieniem visā Latvijā.'
      : 'Boat rental service offering kayaks, canoes, and rafts for river adventures across Latvia.',
    url: isLv ? SITE_URL : `${SITE_URL}/en`,
    telephone: '+37129211634',
    email: 'info@laivunoma.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jāņa Čakstes 1-41',
      addressLocality: 'Sigulda',
      postalCode: 'LV-2150',
      addressCountry: 'LV',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 57.1519, longitude: 24.8647 },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '€€',
    image: 'https://res.cloudinary.com/mucas/image/upload/q_auto,f_auto/mucas/rivers/gauja/hero',
    inLanguage: isLv ? 'lv' : 'en',
  }

  return (
    <html lang={locale} className={montserrat.variable}>
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
        <NextIntlClientProvider messages={messages}>
          <Nav locale={locale} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
