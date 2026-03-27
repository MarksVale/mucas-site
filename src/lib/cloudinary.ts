// Cloudinary URL helpers — cloud: mucas
const CLOUD = 'mucas'
const BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`
const FALLBACK = 'd_mucas:routes:abavas-rumba-renda:hero'

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
export function cldHero(type: 'rivers' | 'routes', slug: string): string {
  return `${BASE}/c_fill,g_auto,w_1400,h_600,q_auto,f_auto,${FALLBACK}/mucas/${type}/${slug}/hero`
}

/** Gallery thumbnail (800×560, smart-cropped) */
export function cldGallery(type: 'rivers' | 'routes', slug: string, n: number): string {
  return `${BASE}/c_fill,g_auto,w_800,h_560,q_auto,f_auto,${FALLBACK}/mucas/${type}/${slug}/gallery-${n}`
}

/** River card thumbnail (600×340, smart-cropped) */
export function cldCard(slug: string): string {
  return `${BASE}/c_fill,g_auto,w_600,h_340,q_auto,f_auto,${FALLBACK}/mucas/rivers/${slug}/hero`
}

export const CLD_FALLBACK_URL = `${BASE}/c_fill,g_auto,w_800,h_560,q_auto,f_auto/mucas/routes/abavas-rumba-renda/hero`
