import riversContent from '@/content/rivers.json'
import routesContent from '@/content/routes.json'
import { getSanityRiverContent, getSanityRouteContent } from '@/sanity/queries'

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
  galleryCount?: number   // number of gallery-N images in Cloudinary (0 = no photos yet)
}

export interface RouteContent {
  description: string
  highlights: Highlight[]
  difficulty: string
  km: number
  hours: string
  photoUrl: string
  photos?: string[]         // array of photo URLs (Cloudinary / any CDN)
  galleryCount?: number     // number of gallery-N images in Cloudinary (0 = no photos yet)
  startLat?: number
  startLng?: number
  endLat?: number
  endLng?: number
}

const RIVER_FALLBACK: RiverContent = {
  description: '', highlights: [], region: '',
  season: 'May – October', totalLength: 0, priceFrom: 0, photoUrl: '',
}

const ROUTE_FALLBACK: RouteContent = {
  description: '', highlights: [], difficulty: 'Easy',
  km: 0, hours: '', photoUrl: '', photos: [],
}

// Sync version — reads from local JSON only (used in non-async contexts)
export function getRiverContent(slug: string): RiverContent {
  return (riversContent as Record<string, RiverContent>)[slug] ?? RIVER_FALLBACK
}

export function getRouteContent(slug: string): RouteContent {
  return (routesContent as Record<string, RouteContent>)[slug] ?? ROUTE_FALLBACK
}

// Async version — tries Sanity first, falls back to local JSON
export async function getRiverContentAsync(slug: string): Promise<RiverContent> {
  const sanity = await getSanityRiverContent(slug)
  if (sanity) {
    const local = getRiverContent(slug)
    return { ...local, ...sanity }
  }
  return getRiverContent(slug)
}

export async function getRouteContentAsync(slug: string): Promise<RouteContent> {
  const sanity = await getSanityRouteContent(slug)
  if (sanity) {
    const local = getRouteContent(slug)
    return { ...local, ...sanity }
  }
  return getRouteContent(slug)
}
