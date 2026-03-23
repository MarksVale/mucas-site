// Cloudinary URL helpers — cloud: mucas
// Convention: mucas/rivers/[slug]/hero, gallery-1 … gallery-N
//             mucas/routes/[slug]/hero, gallery-1 … gallery-N
//             mucas/boats/[slug]/hero
//             mucas/boats/fallback/hero  ← generic fallback for boats without a photo

const CLOUD = 'mucas'
const BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`

/** Full-width hero (1400×600, smart-cropped) */
export function cldHero(type: 'rivers' | 'routes', slug: string): string {
  return `${BASE}/c_fill,g_auto,w_1400,h_600,q_auto,f_auto/mucas/${type}/${slug}/hero`
}

/** Gallery thumbnail (800×560, smart-cropped) */
export function cldGallery(type: 'rivers' | 'routes', slug: string, n: number): string {
  return `${BASE}/c_fill,g_auto,w_800,h_560,q_auto,f_auto/mucas/${type}/${slug}/gallery-${n}`
}

/** Boat card photo (640×420, smart-cropped) */
export function cldBoat(slug: string): string {
  return `${BASE}/c_fill,g_auto,w_640,h_420,q_auto,f_auto/mucas/boats/${slug}/hero`
}

/** Generic boat fallback — upload one photo to mucas/boats/fallback/hero in Cloudinary */
export const CLD_BOAT_FALLBACK = `${BASE}/c_fill,g_auto,w_640,h_420,q_auto,f_auto/mucas/boats/fallback/hero`
