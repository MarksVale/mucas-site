import { getRivers, getRoutes, getRoutesByRiver, getRiver, getRoute } from './airtable'
import {
  getStaticRivers,
  getStaticRiver,
  getStaticRoutes,
  getStaticRoutesByRiver,
  getStaticRoute,
  getBranchForRiver,
  getBranches,
  type Branch,
  type StaticRiver,
  type StaticRoute,
} from '../data/static-rivers'

// A unified river type that works for both Airtable and static rivers
export interface UnifiedRiver {
  slug: string
  name: string
  region: string
  description: string
  routeCount: number
  bookable: boolean // true = online booking, false = phone/email
  branchSlug: string
  gradient: string
  season?: string
  difficulty?: string
  totalLength?: number
}

// A unified route type that works for both Airtable and static routes
export interface UnifiedRoute {
  slug: string
  name: string
  river: string
  riverSlug: string
  days: string
  distance: string
  difficulty: string
  bookable: boolean
  branchSlug: string
  gradient: string
  // Only for bookable (Airtable) routes:
  startTimes?: string[]
  transportCost?: number
  boats?: string[]
  hub?: string
  // Only for static routes:
  startPoint?: string
  endPoint?: string
}

export async function getAllRivers(): Promise<UnifiedRiver[]> {
  // Get Airtable rivers (online bookable)
  const airtableRivers = await getRivers()
  const bookableRivers: UnifiedRiver[] = airtableRivers.map(r => ({
    slug: r.slug,
    name: r.name,
    region: 'Vidzeme', // All current Airtable rivers are Vidzeme
    description: '', // Will use page-level descriptions
    routeCount: r.routeCount,
    bookable: true,
    branchSlug: r.slug === 'salaca' ? 'staicele' : 'sigulda',
    gradient: r.gradient,
  }))

  // Get static rivers (phone/email booking)
  const staticRiversData = getStaticRivers()
  const staticUnified: UnifiedRiver[] = staticRiversData.map(r => ({
    slug: r.slug,
    name: r.name,
    region: r.region,
    description: r.description,
    routeCount: r.routeCount,
    bookable: false,
    branchSlug: r.branchSlug,
    gradient: r.gradient,
    season: r.season,
    difficulty: r.difficulty,
    totalLength: r.totalLength,
  }))

  return [...bookableRivers, ...staticUnified]
}

export async function getAllRoutes(): Promise<UnifiedRoute[]> {
  // Get Airtable routes (online bookable)
  const airtableRoutes = await getRoutes()
  const bookableRoutes: UnifiedRoute[] = airtableRoutes.map(r => ({
    slug: r.slug,
    name: r.name,
    river: r.river,
    riverSlug: r.riverSlug,
    days: r.days.toString(),
    distance: `${r.distance} km`,
    difficulty: r.difficulty,
    bookable: true,
    branchSlug: r.riverSlug === 'salaca' ? 'staicele' : 'sigulda',
    gradient: r.gradient,
    startTimes: r.startTimes,
    transportCost: r.transportCost,
    boats: r.boats,
    hub: r.hub,
  }))

  // Get static routes (phone/email booking)
  const staticRoutesData = getStaticRoutes()
  const staticUnifiedRoutes: UnifiedRoute[] = staticRoutesData.map(r => ({
    slug: r.slug,
    name: r.name,
    river: r.river,
    riverSlug: r.riverSlug,
    days: r.days,
    distance: r.distance,
    difficulty: r.difficulty,
    bookable: false,
    branchSlug: r.branchSlug,
    gradient: r.gradient,
    startPoint: r.startPoint,
    endPoint: r.endPoint,
  }))

  return [...bookableRoutes, ...staticUnifiedRoutes]
}

export async function getUnifiedRiver(slug: string): Promise<UnifiedRiver | undefined> {
  const allRivers = await getAllRivers()
  return allRivers.find(r => r.slug === slug)
}

export async function getUnifiedRoute(slug: string): Promise<UnifiedRoute | undefined> {
  const allRoutes = await getAllRoutes()
  return allRoutes.find(r => r.slug === slug)
}

export async function getRoutesForRiver(riverSlug: string): Promise<UnifiedRoute[]> {
  const allRoutes = await getAllRoutes()
  return allRoutes.filter(r => r.riverSlug === riverSlug)
}

// Re-export types and functions from static-rivers for convenience
export type { Branch, StaticRiver, StaticRoute }
export {
  getBranch,
  getBranches,
  getBranchForRiver,
}
