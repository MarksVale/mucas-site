import type { Metadata } from 'next'
import { getRivers, getRoutes } from '@/lib/airtable'
import { getRiverContent, getRouteContent } from '@/lib/content'
import { cldGallery, cldHero } from '@/lib/cloudinary'
import Link from 'next/link'
import GalleryGrid from '@/components/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery | Mučas Laivu Noma',
  description: 'Photos from our kayak, canoe, and raft trips on Latvia\'s most beautiful rivers — Gauja, Salaca, Brasla, and Amata.',
}

interface GalleryImage {
  src: string
  alt: string
  river: string
  link: string
}

export default async function GalleryPage() {
  const rivers = await getRivers()
  const routes = await getRoutes()

  const images: GalleryImage[] = []

  // River hero + gallery images
  for (const river of rivers) {
    const content = getRiverContent(river.slug)
    images.push({
      src: cldHero('rivers', river.slug).replace('w_1400,h_600', 'w_800,h_560'),
      alt: `${river.name} river`,
      river: river.name,
      link: `/rivers/${river.slug}`,
    })
    const count = Math.max(content.galleryCount ?? 0, 3)
    for (let i = 1; i <= count; i++) {
      images.push({
        src: cldGallery('rivers', river.slug, i),
        alt: `${river.name} river photo ${i}`,
        river: river.name,
        link: `/rivers/${river.slug}`,
      })
    }
  }

  // Route hero + gallery images
  for (const route of routes) {
    const content = getRouteContent(route.slug)
    const riverName = rivers.find(r => r.slug === route.riverSlug)?.name ?? route.river
    images.push({
      src: cldHero('routes', route.slug).replace('w_1400,h_600', 'w_800,h_560'),
      alt: route.name,
      river: riverName,
      link: `/routes/${route.slug}`,
    })
    const count = Math.max(content.galleryCount ?? 0, 3)
    for (let i = 1; i <= count; i++) {
      images.push({
        src: cldGallery('routes', route.slug, i),
        alt: `${route.name} photo ${i}`,
        river: riverName,
        link: `/routes/${route.slug}`,
      })
    }
  }

  // Unique river names for filter tabs
  const riverNames = [...new Set(images.map(img => img.river))]

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Gallery</h1>
          <p>Get inspired — photos from our river adventures across Latvia</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <GalleryGrid images={images} riverNames={riverNames} />
        </div>
      </section>

      <section className="cta-fullbleed">
        <div className="container">
          <h2>Like What You See?</h2>
          <p>Book your own river adventure today.</p>
          <Link href="/booking" className="btn btn-primary btn-lg">Book Now</Link>
        </div>
      </section>
    </>
  )
}
