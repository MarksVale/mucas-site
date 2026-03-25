import { getRivers, getRoutes, getBranches, getBranchForRiver } from './airtable'
import type { Branch } from './airtable'

// A unified river type for the rivers listing page
export interface UnifiedRiver {
  slug: string
  name: string
  region: string
  description: string
  routeCount: number
  bookable: boolean
  branchSlug: string
  gradient: string
  season?: string
  difficulty?: string
  totalLength?: number
}

// A unified route type
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
  startTimes?: string[]
  transportCost?: number
  boats?: string[]
  hub?: string
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
    branchSlug: r.slug === 'salaca' ? 'staicele' : 'sigulda',
    gradient: r.gradient,
  }))
}

export async function getAllRoutes(): Promise<UnifiedRoute[]> {
  const routes = await getRoutes()
  return routes.map(r => ({
    slug: r.slug,
    name: r.name,
    river: r.river,
    riverSlug: r.riverSlug,
    days: r.days.toString(),
    distance: r.km > 0 ? `${r.km} km` : '',
    difficulty: r.difficulty,
    bookable: true,
    branchSlug: r.riverSlug === 'salaca' ? 'staicele' : 'sigulda',
    gradient: r.gradient,
    startTimes: r.startTimes,
    transportCost: r.transportCost,
    boats: r.boats,
    hub: r.hub,
  }))
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

export type { Branch }
export { getBranches, getBranchForRiver }
