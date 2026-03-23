import riversContent from '@/content/rivers.json'
import routesContent from '@/content/routes.json'

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
  startCoords?: [number, number]  // [lat, lng] for Leaflet map
  endCoords?: [number, number]
}

export function getRiverContent(slug: string): RiverContent {
  return (riversContent as Record<string, RiverContent>)[slug] ?? {
    description: '', highlights: [], region: '',
    season: 'May – October', totalLength: 0, priceFrom: 0, photoUrl: '',
  }
}

export function getRouteContent(slug: string): RouteContent {
  return (routesContent as unknown as Record<string, RouteContent>)[slug] ?? {
    description: '',
    highlights: [],
    difficulty: 'Easy',
    km: 0,
    hours: '',
    photoUrl: '',
    photos: [],
  }
}
