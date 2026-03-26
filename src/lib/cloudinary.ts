// Cloudinary URL helpers — cloud: mucas
// Convention: mucas/rivers/[slug]/hero, gallery-1 … gallery-N
//             mucas/routes/[slug]/hero, gallery-1 … gallery-N
//             mucas/boats/[slug]/hero
//
// Every URL includes a Cloudinary d_ fallback so grey/white placeholders
// never appear — missing images always serve the Salaca hero instead.

const CLOUD = 'mucas'
const BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`

// Single global fallback — the Salaca hero is always in Cloudinary
const FALLBACK = 'd_mucas:rivers:salaca:hero'

/** Full-width hero (1400×600, smart-cropped). Falls back to Salaca hero. */
export function cldHero(type: 'rivers' | 'routes', slug: string): string {
  return `${BASE}/c_fill,g_auto,w_1400,h_600,q_auto,f_auto,${FALLBACK}/mucas/${type}/${slug}/hero`
}

/** Gallery thumbnail (800×560, smart-cropped). Falls back to Salaca hero. */
export function cldGallery(type: 'rivers' | 'routes', slug: string, n: number): string {
  return `${BASE}/c_fill,g_auto,w_800,h_560,q_auto,f_auto,${FALLBACK}/mucas/${type}/${slug}/gallery-${n}`
}

/** River card thumbnail (600×340, smart-cropped). Falls back to Salaca hero. */
export function cldCard(slug: string): string {
  return `${BASE}/c_fill,g_auto,w_600,h_340,q_auto,f_auto,${FALLBACK}/mucas/rivers/${slug}/hero`
}

/** Boat card photo (640×420, smart-cropped). Falls back to boat fallback, then Salaca hero. */
export function cldBoat(slug: string): string {
  return `${BASE}/c_fill,g_auto,w_640,h_420,q_auto,f_auto,d_mucas:boats:fallback:hero,${FALLBACK}/mucas/boats/${slug}/hero`
}

/** Generic boat fallback URL — also has the global fallback applied. */
export const CLD_BOAT_FALLBACK = `${BASE}/c_fill,g_auto,w_640,h_420,q_auto,f_auto,${FALLBACK}/mucas/boats/fallback/hero`

/** Pre-built fallback URL for client components (onError handlers etc.) */
export const CLD_FALLBACK_URL = `${BASE}/c_fill,g_auto,w_800,h_560,q_auto,f_auto/mucas/rivers/salaca/hero`
