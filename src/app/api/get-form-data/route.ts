import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const AIRTABLE_PAT = process.env.AIRTABLE_PAT
const BASE_ID = 'appYaHUWSdtuUSeaB'
const RIVERS_TABLE = 'tbljVF5T997io0iuJ'
const ROUTES_TABLE = 'tbl8OxvtV7vlgTCXe'
const BOAT_TYPES_TABLE = 'tbl5c4tD2a6kStsMQ'
const BOOKING_WINDOWS_TABLE = 'tblT7dUHbvvkdI1qi'

async function fetchAirtable(tableId: string, filter?: string) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}` +
    (filter ? `?filterByFormula=${encodeURIComponent(filter)}` : '')
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_PAT}` },
    cache: 'no-store',
  })
  return res.json()
}

export async function GET() {
  try {
    const [riversData, routesData, boatTypesData, windowsData] = await Promise.all([
      fetchAirtable(RIVERS_TABLE, '{Active} = 1'),
      fetchAirtable(ROUTES_TABLE, '{Active} = 1'),
      fetchAirtable(BOAT_TYPES_TABLE, '{Active} = 1'),
      fetchAirtable(BOOKING_WINDOWS_TABLE),
    ])

    const boatTypes = (boatTypesData.records || []).map((r: Record<string, any>) => ({
      id: r.id,
      name: r.fields['Boat type name'],
      price: r.fields['Price per day'] || 0,
      capacity: r.fields['Seating Capacity'] || 1,
      category: r.fields['Category'] || '',
    }))

    const bookingWindows = (windowsData.records || []).map((r: Record<string, any>) => ({
      riverId: (r.fields['Rivers'] || [])[0] || null,
      seasonOpen: r.fields['Season Open'] || null,
      seasonClose: r.fields['Season Close'] || null,
      type: r.fields['Blocked Dates'] || 'Open',
      notes: r.fields['Notes'] || '',
    })).filter((w: any) => w.riverId)

    const rivers = (riversData.records || []).map((r: Record<string, any>) => ({
      id: r.id,
      name: r.fields['River name'],
    }))

    const routes = (routesData.records || []).map((r: Record<string, any>) => ({
      id: r.id,
      name: r.fields['Route name'],
      riverId: r.fields['River']?.[0],
      hubName: r.fields['Starting Hub Lookup']?.[0] || '',
      startTimes: r.fields['Start Times'] || [],
      transportCost: r.fields['Transport Cost'] || 0,
      boatTypeIds: r.fields['Boat Types'] || [],
    }))

    return NextResponse.json({ rivers, routes, boatTypes, bookingWindows })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
