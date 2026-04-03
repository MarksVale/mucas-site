// Cloudinary URL helpers — cloud: mucas
const CLOUD = 'mucas'
const BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`
const FALLBACK = 'd_mucas:rivers:gauja:hero'

/** Boat card thumbnail (640×420) — cloudinaryId comes from Airtable */
export function cldBoat(cloudinaryId: string): string {
  if (cloudinaryId) return `${BASE}/c_fill,g_auto,w_640,h_420,q_auto,f_auto/${cloudinaryId}`
  return CLD_BOAT_FALLBACK
}

/** Boat modal full-size image (1200×800) */
export function cldBoatFull(cloudinaryId: string): string {
  if (cloudinaryId) return `${BASE}/c_fill,g_auto,w_1200,h_800,q_auto,f_auto/${cloudinaryId}`
  return CLD_BOAT_FALLBACK
}

export const CLD_BOAT_FALLBACK = `${BASE}/c_fill,g_auto,w_640,h_420,q_auto,f_auto,${FALLBACK}/mucas/boats/fallback/hero`

/** Boat specs from CSV — keyed by exact boat name */
export interface BoatSpecs {
  type: string
  lengthCm: number
  widthCm: number
  capacityKg: number | null
  seats: string
  weightKg: number
}

export const BOAT_SPECS: Record<string, BoatSpecs> = {
  'Kajaks VISTA':                { type: 'Kayak',      lengthCm: 485, widthCm: 82,  capacityKg: 300,  seats: '2',   weightKg: 41 },
  'SUP Bee':                     { type: 'SUP',        lengthCm: 320, widthCm: 82,  capacityKg: 120,  seats: '1',   weightKg: 11 },
  'Perception SCOOTER':          { type: 'Kayak',      lengthCm: 295, widthCm: 75,  capacityKg: 150,  seats: '1',   weightKg: 20 },
  'Kanoe LOXIA':                 { type: 'Canoe',      lengthCm: 506, widthCm: 97,  capacityKg: 475,  seats: '3',   weightKg: 36 },
  'Kanoe ROTOATTIVO CANADIER 3': { type: 'Canoe',      lengthCm: 520, widthCm: 90,  capacityKg: null, seats: '3',   weightKg: 44 },
  'Kanoe ALBA':                  { type: 'Canoe',      lengthCm: 470, widthCm: 85,  capacityKg: 250,  seats: '2+1', weightKg: 38 },
  'DULKAN Amata 300':            { type: 'Raft',       lengthCm: 300, widthCm: 125, capacityKg: 300,  seats: '2',   weightKg: 15 },
  'BUSH Venta 300':              { type: 'Raft',       lengthCm: 300, widthCm: 140, capacityKg: 420,  seats: '2+1', weightKg: 26 },
  'Kanoe PELICAN':               { type: 'Canoe',      lengthCm: 472, widthCm: 94,  capacityKg: 363,  seats: '2+1', weightKg: 37 },
  'DULKAN Raft 330':             { type: 'Raft',       lengthCm: 330, widthCm: 150, capacityKg: 650,  seats: '4',   weightKg: 32 },
  'DULKAN Raft 460':             { type: 'Raft',       lengthCm: 460, widthCm: 180, capacityKg: 1000, seats: '8+1', weightKg: 51 },
}

/** Full-width hero (1400×600, smart-cropped) */
export function cldHero(type: 'rivers', slug: string): string {
  return `${BASE}/${FALLBACK}/c_fill,g_auto,w_1400,h_600,q_auto,f_auto/mucas/${type}/${slug}/gallery-1`
}

/** Gallery thumbnail (800×560, smart-cropped) */
export function cldGallery(slug: string, n: number): string {
  return `${BASE}/${FALLBACK}/c_fill,g_auto,w_800,h_560,q_auto,f_auto/mucas/rivers/${slug}/gallery-${n}`
}

/** River card thumbnail (600×340, smart-cropped) */
export function cldCard(slug: string): string {
  return `${BASE}/${FALLBACK}/c_fill,g_auto,w_600,h_340,q_auto,f_auto/mucas/rivers/${slug}/gallery-1`
}

export const CLD_FALLBACK_URL = `${BASE}/c_fill,g_auto,w_800,h_560,q_auto,f_auto/mucas/rivers/gauja/hero`

/** Fetch all images from the mucas/hero images Cloudinary folder (server-side only).
 *  Uses the Search API so it works with Cloudinary's asset_folder system.
 *  Falls back to the Gauja hero if credentials are missing or folder is empty. */
export async function getHeroImages(): Promise<string[]> {
  const fallback = [`${BASE}/c_fill,g_auto,w_1920,h_1080,q_auto,f_auto/mucas/rivers/gauja/hero`]
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!apiKey || !apiSecret) return fallback

  try {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD}/resources/search`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expression: 'asset_folder="mucas/hero images"', max_results: 20, sort_by: [{ created_at: 'asc' }] }),
      next: { revalidate: 300 },
    })
    if (!res.ok) return fallback
    const data = await res.json()
    const resources: { public_id: string }[] = data.resources ?? []
    if (!resources.length) return fallback
    return resources.map(r => `${BASE}/c_fill,g_auto,w_1920,h_1080,q_auto,f_auto/${r.public_id}`)
  } catch {
    return fallback
  }
}
