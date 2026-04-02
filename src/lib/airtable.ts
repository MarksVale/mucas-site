// Airtable API configuration
// Base ID: appYaHUWSdtuUSeaB
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appYaHUWSdtuUSeaB'
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || ''

const API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

async function fetchTable(tableName: string, params?: Record<string, string>) {
  let allRecords: any[] = []
  let offset: string | undefined

  do {
    const url = new URL(`${API_URL}/${encodeURIComponent(tableName)}`)
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    }
    if (offset) {
      url.searchParams.set('offset', offset)
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      console.error(`Airtable fetch failed for ${tableName}:`, res.status)
      return allRecords
    }

    const data = await res.json()
    allRecords = allRecords.concat(data.records || [])
    offset = data.offset
  } while (offset)

  return allRecords
}

// Types — matching real Airtable fields
export interface River {
  slug: string
  name: string
  active: boolean
  routeCount: number
  boatCategories: string[]
  gradient: string
  region: string
  bookingType: 'online' | 'phone'
  description: string
  galleryCount: number
  highlights: { name: string; desc: string }[]
  season: string
  totalLength: number
  priceFrom: number
  lat: number
  lng: number
}

export interface Route {
  slug: string
  name: string
  river: string
  riverSlug: string
  days: number
  active: boolean
  hub: string
  startTimes: string[]
  transportCost: number
  boats: string[]
  gradient: string
  km: number
  difficulty: string
  description: string
  highlights: { name: string; desc: string }[]
  hours: string
}

export interface Branch {
  slug: string
  name: string
  region: string
  bookingType: 'online' | 'phone'
  contactPerson: string
  phone: string
  email: string
}

export interface BoatType {
  slug: string
  name: string
  category: string
  seats: number
  pricePerDay: number
  active: boolean
  cloudinaryId: string
}

export interface Hub {
  slug: string
  name: string
  river: string
  type: string
}

// =============================================
// FALLBACK DATA — matches real Airtable content
// =============================================

const FALLBACK_RIVERS: River[] = [
  { slug: 'gauja', name: 'Gauja', active: true, routeCount: 11, boatCategories: ['Kayaks', 'Canoes'], gradient: 'g-gauja', region: 'Vidzeme', bookingType: 'online', description: '', galleryCount: 0, highlights: [], season: 'May – September', totalLength: 452, priceFrom: 15, lat: 0, lng: 0 },
  { slug: 'amata', name: 'Amata', active: true, routeCount: 2, boatCategories: ['Rafts'], gradient: 'g-amata', region: 'Vidzeme', bookingType: 'online', description: '', galleryCount: 0, highlights: [], season: 'May – September', totalLength: 40, priceFrom: 15, lat: 0, lng: 0 },
  { slug: 'salaca', name: 'Salaca', active: true, routeCount: 5, boatCategories: ['Kayaks', 'Canoes'], gradient: 'g-salaca', region: 'Vidzeme', bookingType: 'online', description: '', galleryCount: 0, highlights: [], season: 'May – September', totalLength: 95, priceFrom: 15, lat: 0, lng: 0 },
  { slug: 'brasla', name: 'Brasla', active: true, routeCount: 11, boatCategories: ['Kayaks', 'Canoes'], gradient: 'g-brasla', region: 'Vidzeme', bookingType: 'online', description: '', galleryCount: 0, highlights: [], season: 'May – September', totalLength: 55, priceFrom: 15, lat: 0, lng: 0 },
]

const FALLBACK_ROUTES: Route[] = [
  // Gauja routes
  { slug: 'valmiera-cesis', name: 'Valmiera - Cēsis', river: 'Gauja', riverSlug: 'gauja', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 120, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'cesis-sigulda', name: 'Cēsis - Sigulda', river: 'Gauja', riverSlug: 'gauja', days: 2, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'strenci-valmiera', name: 'Strenči - Valmiera', river: 'Gauja', riverSlug: 'gauja', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 150, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'grivini-cesis', name: 'Grīviņi - Cēsis', river: 'Gauja', riverSlug: 'gauja', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 80, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'cesis-ligatne', name: 'Cēsis - Līgatne', river: 'Gauja', riverSlug: 'gauja', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'ligatne-sigulda', name: 'Līgatne - Sigulda', river: 'Gauja', riverSlug: 'gauja', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 50, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'sigulda-ramkalni', name: 'Sigulda - Rāmkalni', river: 'Gauja', riverSlug: 'gauja', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 50, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'ligatne-ramkalni', name: 'Līgatne - Rāmkalni', river: 'Gauja', riverSlug: 'gauja', days: 2, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 70, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'valmiera-sigulda', name: 'Valmiera - Sigulda', river: 'Gauja', riverSlug: 'gauja', days: 3, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 120, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'valmiera-ligatne', name: 'Valmiera - Līgatne', river: 'Gauja', riverSlug: 'gauja', days: 3, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 120, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'janramis-sigulda', name: 'Jāņrāmis - Sigulda', river: 'Gauja', riverSlug: 'gauja', days: 3, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 70, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460'], gradient: 'g-gauja', km: 0, difficulty: '', description: '', highlights: [], hours: '' },

  // Amata routes
  { slug: 'melturi-veclacu-tilts', name: 'Melturi - Veclauču tilts', river: 'Amata', riverSlug: 'amata', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 460', 'DULKAN Raft 330'], gradient: 'g-amata', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'zvartes-iezis-veclacu-tilts', name: 'Zvārtes iezis - Veclauču tilts', river: 'Amata', riverSlug: 'amata', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 460', 'DULKAN Raft 330'], gradient: 'g-amata', km: 0, difficulty: '', description: '', highlights: [], hours: '' },

  // Salaca routes
  { slug: 'mazsalaca-licu-skola', name: 'Mazsalaca - Līču skola', river: 'Salaca', riverSlug: 'salaca', days: 1, active: true, hub: 'Mazsalaca', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 40, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460', 'Piepūšamais plosts VIKING 10', 'Piepūšamais plosts VIKING 20'], gradient: 'g-salaca', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'mazsalaca-staicele', name: 'Mazsalaca - Staicele', river: 'Salaca', riverSlug: 'salaca', days: 2, active: true, hub: 'Mazsalaca', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460', 'Piepūšamais plosts VIKING 10', 'Piepūšamais plosts VIKING 20'], gradient: 'g-salaca', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'staicele-salacgriva', name: 'Staicele - Salacgrīva', river: 'Salaca', riverSlug: 'salaca', days: 2, active: true, hub: 'Staicele', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 75, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460', 'Piepūšamais plosts VIKING 10', 'Piepūšamais plosts VIKING 20'], gradient: 'g-salaca', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'staicele-sarkanas-klintis', name: 'Staicele - Sarkanās Klintis', river: 'Salaca', riverSlug: 'salaca', days: 1, active: true, hub: 'Staicele', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 65, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460', 'Piepūšamais plosts VIKING 10', 'Piepūšamais plosts VIKING 20'], gradient: 'g-salaca', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'mazsalaca-viku-tilts', name: 'Mazsalaca - Vīķu tilts', river: 'Salaca', riverSlug: 'salaca', days: 2, active: true, hub: 'Mazsalaca', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'SUP Bee', 'Kanoe LOXIA', 'Perception PESCADOR', 'Kanoe ROTOATTIVO CANADIER 3', 'Kanoe ALBA', 'Kanoe PELICAN', 'DULKAN Amata 300', 'BUSH Venta 300', 'DULKAN Raft 330', 'DULKAN Raft 460', 'Piepūšamais plosts VIKING 10', 'Piepūšamais plosts VIKING 20'], gradient: 'g-salaca', km: 0, difficulty: '', description: '', highlights: [], hours: '' },

  // Brasla routes
  { slug: 'rozula-vejini', name: 'Rozula - Vējiņi', river: 'Brasla', riverSlug: 'brasla', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'rozula-a3-tilts', name: 'Rozula - A3 tilts', river: 'Brasla', riverSlug: 'brasla', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'placis-a3-tilts', name: 'Plācis - A3 tilts', river: 'Brasla', riverSlug: 'brasla', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'vejini-a3-tilts', name: 'Vējiņi - A3 tilts', river: 'Brasla', riverSlug: 'brasla', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'placis-ieteka-gauja', name: 'Plācis - Ieteka Gaujā', river: 'Brasla', riverSlug: 'brasla', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'vejini-ieteka-gauja', name: 'Vējiņi - Ieteka Gaujā', river: 'Brasla', riverSlug: 'brasla', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'straupe-a3-tilts', name: 'Straupe - A3 tilts', river: 'Brasla', riverSlug: 'brasla', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'straupe-ieteka-gauja', name: 'Straupe - Ieteka Gaujā', river: 'Brasla', riverSlug: 'brasla', days: 1, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'rozula-ieteka-gauja', name: 'Rozula - Ieteka Gaujā', river: 'Brasla', riverSlug: 'brasla', days: 2, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'placis-sigulda', name: 'Plācis - Sigulda', river: 'Brasla', riverSlug: 'brasla', days: 2, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
  { slug: 'straupe-sigulda', name: 'Straupe - Sigulda', river: 'Brasla', riverSlug: 'brasla', days: 2, active: true, hub: 'Sigulda', startTimes: ['9:00', '11:00', '13:00', '15:00'], transportCost: 60, boats: ['Kajaks VISTA', 'Kanoe PELICAN', 'Kanoe ROTOATTIVO CANADIER 3'], gradient: 'g-brasla', km: 0, difficulty: '', description: '', highlights: [], hours: '' },
]

const FALLBACK_BOATS: BoatType[] = [
  { slug: 'kajaks-vista', name: 'Kajaks VISTA', category: 'Kayaks', seats: 2, pricePerDay: 20, active: true, cloudinaryId: 'Kajaks_VISTA_t531t5' },
  { slug: 'perception-pescador', name: 'Perception PESCADOR', category: 'Kayaks', seats: 1, pricePerDay: 15, active: true, cloudinaryId: '' },
  { slug: 'kanoe-loxia', name: 'Kanoe LOXIA', category: 'Canoes', seats: 3, pricePerDay: 20, active: true, cloudinaryId: 'Kanoe_LOXIA_dcbp10' },
  { slug: 'kanoe-rotoattivo-canadier-3', name: 'Kanoe ROTOATTIVO CANADIER 3', category: 'Canoes', seats: 3, pricePerDay: 20, active: true, cloudinaryId: 'Kanoe_ROTOATTIVO_CANADIER_3_gkjcu5' },
  { slug: 'kanoe-alba', name: 'Kanoe ALBA', category: 'Canoes', seats: 3, pricePerDay: 20, active: true, cloudinaryId: 'Kanoe_ALBA_yj3wmf' },
  { slug: 'kanoe-pelican', name: 'Kanoe PELICAN', category: 'Canoes', seats: 3, pricePerDay: 20, active: true, cloudinaryId: 'Kanoe_PELICAN_gq0shq' },
  { slug: 'sup-bee', name: 'SUP Bee', category: 'SUP', seats: 1, pricePerDay: 20, active: true, cloudinaryId: 'SUP_Bee_o2dojg' },
  { slug: 'dulkan-amata-300', name: 'DULKAN Amata 300', category: 'Rafts', seats: 2, pricePerDay: 35, active: true, cloudinaryId: 'DULKAN_Raft_330_uw4lts' },
  { slug: 'bush-venta-300', name: 'BUSH Venta 300', category: 'Rafts', seats: 3, pricePerDay: 35, active: true, cloudinaryId: 'BUSH_Venta_300_vc3hi0' },
  { slug: 'dulkan-raft-330', name: 'DULKAN Raft 330', category: 'Rafts', seats: 4, pricePerDay: 45, active: true, cloudinaryId: 'Dunkan_Amata_300_zombji' },
  { slug: 'dulkan-raft-460', name: 'DULKAN Raft 460', category: 'Rafts', seats: 9, pricePerDay: 65, active: true, cloudinaryId: 'Dunkan_Raft_460_n0pjak' },
  { slug: 'viking-10', name: 'Piepūšamais plosts VIKING 10', category: 'Big Rafts', seats: 10, pricePerDay: 35, active: false, cloudinaryId: '' },
  { slug: 'viking-20', name: 'Piepūšamais plosts VIKING 20', category: 'Big Rafts', seats: 20, pricePerDay: 50, active: false, cloudinaryId: '' },
]

// Helper: make a URL-safe slug from a route/river name
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ā/g, 'a').replace(/č/g, 'c').replace(/ē/g, 'e')
    .replace(/ģ/g, 'g').replace(/ī/g, 'i').replace(/ķ/g, 'k')
    .replace(/ļ/g, 'l').replace(/ņ/g, 'n').replace(/š/g, 's')
    .replace(/ū/g, 'u').replace(/ž/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Helper: parse a JSON highlights string into [{name, desc}] array
function parseHighlights(json: string | undefined): { name: string; desc: string }[] {
  if (!json) return []
  try {
    const parsed = JSON.parse(json)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Helper: resolve a field value that could be a multi-select object OR a plain string
function resolveName(val: any): string {
  if (!val) return ''
  if (typeof val === 'string') return val
  if (typeof val === 'object' && val.name) return val.name
  return ''
}

// Data fetchers
export async function getRivers(locale?: string): Promise<River[]> {
  if (!AIRTABLE_API_KEY) return FALLBACK_RIVERS

  const lv = locale === 'lv'
  const records = await fetchTable('Rivers')
  return records
    .map((r: any) => {
      const name = r.fields['River name'] || ''
      // Boat Types may be multi-select [{id,name,color}] or linked record IDs or a lookup text
      const rawBT = r.fields['Boat Types'] || r.fields['Boat categories'] || []
      const boatCategories = Array.isArray(rawBT)
        ? rawBT.map(resolveName).filter(Boolean)
        : []
      return {
        slug: toSlug(name),
        name,
        active: r.fields['Active'] || false,
        routeCount: (r.fields['Routes'] || []).length,
        boatCategories,
        gradient: `g-${toSlug(name)}`,
        region: r.fields['Region']?.name || r.fields['Region'] || '',
        bookingType: (r.fields['Booking Type']?.name || r.fields['Booking Type'] || 'online') as 'online' | 'phone',
        description: lv ? (r.fields['Description LV'] || r.fields['Description'] || '') : (r.fields['Description'] || ''),
        galleryCount: r.fields['Gallery Count'] || 4,
        highlights: parseHighlights(lv ? (r.fields['Highlights LV'] || r.fields['Highlights']) : r.fields['Highlights']),
        season: lv ? (r.fields['Season LV'] || r.fields['Season'] || '') : (r.fields['Season'] || ''),
        totalLength: r.fields['Total Length km'] || 0,
        priceFrom: r.fields['Price From'] || 0,
        lat: r.fields['Latitude'] || 0,
        lng: r.fields['Longitude'] || 0,
      }
    })
}

export async function getRiver(slug: string, locale?: string): Promise<River | undefined> {
  const rivers = await getRivers(locale)
  return rivers.find(r => r.slug === slug)
}

export async function getRoutes(locale?: string): Promise<Route[]> {
  if (!AIRTABLE_API_KEY) return FALLBACK_ROUTES.filter(r => r.active)
  const lv = locale === 'lv'

  // Fetch rivers first so we can resolve linked record IDs → river name/slug
  const riverRecords = await fetchTable('Rivers')
  const riverById: Record<string, { name: string; slug: string }> = {}
  riverRecords.forEach((r: any) => {
    const name = r.fields['River name'] || ''
    riverById[r.id] = { name, slug: toSlug(name) }
  })

  // Fetch boats so we can resolve boat linked record IDs → boat names
  const boatRecords = await fetchTable('Boat Types')
  const boatById: Record<string, string> = {}
  boatRecords.forEach((r: any) => {
    boatById[r.id] = r.fields['Boat type name'] || ''
  })

  const records = await fetchTable('Routes')
  return records
    .filter((r: any) => r.fields['Active'])
    .map((r: any) => {
      // River: linked record → array of IDs, or multi-select object, or plain text
      const riverRaw = r.fields['River'] || []
      let riverName = ''
      let riverSlug = ''
      if (Array.isArray(riverRaw) && riverRaw.length > 0) {
        const first = riverRaw[0]
        if (typeof first === 'string' && riverById[first]) {
          // linked record ID
          riverName = riverById[first].name
          riverSlug = riverById[first].slug
        } else {
          // plain text or object
          riverName = resolveName(first)
          riverSlug = toSlug(riverName)
        }
      }

      // Boat Types: could be linked record IDs or multi-select objects
      const boatRaw = r.fields['Boat Types'] || []
      const boats = Array.isArray(boatRaw)
        ? boatRaw.map((bt: any) => {
            if (typeof bt === 'string') return boatById[bt] || bt
            return resolveName(bt)
          }).filter(Boolean)
        : []

      // Start Times: multi-select objects
      const startTimes = (r.fields['Start Times'] || [])
        .map(resolveName)
        .filter((n: string) => n && n !== 'Cits laiks')

      const enName = r.fields['Route name'] || ''
      return {
        slug: toSlug(enName), // slug always from English name for stable URLs
        name: lv ? (r.fields['Route name LV'] || enName) : enName,
        river: riverName,
        riverSlug,
        days: r.fields['Days'] || 1,
        active: r.fields['Active'] || false,
        hub: (() => {
          const lookup = r.fields['Starting Hub Lookup'] as any
          if (lookup?.linkedRecordIds && lookup?.valuesByLinkedRecordId) {
            const vals = Object.values(lookup.valuesByLinkedRecordId) as any[]
            return vals[0]?.[0] || ''
          }
          return ''
        })(),
        startTimes,
        transportCost: r.fields['Transport Cost'] || 0,
        boats,
        gradient: `g-${riverSlug || 'gauja'}`,
        km: r.fields['km'] || 0,
        difficulty: r.fields['Difficulty']?.name || r.fields['Difficulty'] || '',
        description: lv ? (r.fields['Description LV'] || r.fields['Description'] || '') : (r.fields['Description'] || ''),
        highlights: parseHighlights(lv ? (r.fields['Highlights LV'] || r.fields['Highlights']) : r.fields['Highlights']),
        hours: r.fields['Hours'] || '',
      }
    })
}

export async function getRoute(slug: string, locale?: string): Promise<Route | undefined> {
  const routes = await getRoutes(locale)
  return routes.find(r => r.slug === slug)
}

export async function getRoutesByRiver(riverSlug: string, locale?: string): Promise<Route[]> {
  const routes = await getRoutes(locale)
  return routes.filter(r => r.riverSlug === riverSlug)
}

export async function getBoats(): Promise<BoatType[]> {
  if (!AIRTABLE_API_KEY) return FALLBACK_BOATS.filter(b => b.active)

  const records = await fetchTable('Boat Types')
  return records
    .filter((r: any) => r.fields?.['Active'])
    .map((r: any) => ({
      slug: toSlug(r.fields['Boat type name'] || ''),
      name: r.fields['Boat type name'] || '',
      category: r.fields['Category']?.name || '',
      seats: r.fields['Seating Capacity'] || 0,
      pricePerDay: r.fields['Price per day'] || 0,
      active: r.fields['Active'] || false,
      cloudinaryId: r.fields['cloudinaryId'] || '',
    }))
}

export async function getBranches(): Promise<Branch[]> {
  if (!AIRTABLE_API_KEY) return []

  const records = await fetchTable('Branches')
  return records.map((r: any) => ({
    slug: toSlug(r.fields['Branch Name'] || ''),
    name: r.fields['Branch Name'] || '',
    region: r.fields['Region']?.name || r.fields['Region'] || '',
    bookingType: (r.fields['Booking Type']?.name || r.fields['Booking Type'] || 'phone') as 'online' | 'phone',
    contactPerson: r.fields['Contact Person'] || '',
    phone: r.fields['Phone'] || '',
    email: r.fields['Email'] || '',
  }))
}

export async function getBranchForRiver(riverSlug: string): Promise<Branch | undefined> {
  const rivers = await getRivers()
  const river = rivers.find(r => r.slug === riverSlug)
  if (!river) return undefined
  const branches = await getBranches()
  return branches.find(b => b.region === river.region && b.bookingType === river.bookingType) || branches.find(b => b.region === river.region)
}
