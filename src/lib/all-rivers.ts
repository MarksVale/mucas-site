import { getRivers } from './airtable'

export interface UnifiedRiver {
  slug: string
  name: string
  region: string
  description: string
  routeCount: number
  bookable: boolean
  gradient: string
  galleryCount: number
}

export async function getAllRivers(): Promise<UnifiedRiver[]> {
  const rivers = await getRivers()
  return rivers.map(r => ({
    slug: r.slug,
    name: r.name,
    region: r.region,
    description: r.description,
    routeCount: r.routeCount,
    bookable: r.bookingType === 'online',
    gradient: r.gradient,
    galleryCount: r.galleryCount ?? 0,
  }))
}
