import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Mučas Laivu Noma — Boat Rentals on Latvia\'s Rivers',
  description: 'Rent kayaks, canoes, and rafts for unforgettable river adventures across Latvia. 21 rivers, 110 routes — from beginner-friendly to wild rapids.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
