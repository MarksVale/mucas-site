import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const AIRTABLE_PAT = process.env.AIRTABLE_PAT
const BASE_ID = 'appYaHUWSdtuUSeaB'
const RESERVATIONS_TABLE = 'tblgrNXzhAyDx2JSM'
const RES_LINES_TABLE = 'tblPYvExPEx5GIqgK'
const BOAT_TYPES_TABLE = 'tbl5c4tD2a6kStsMQ'

async function fetchAll(tableId: string, fields: string[]) {
  const fieldParams = fields.map(f => `fields[]=${encodeURIComponent(f)}`).join('&')
  let records: any[] = []
  let offset: string | undefined
  do {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}?${fieldParams}${offset ? `&offset=${offset}` : ''}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_PAT}` },
      cache: 'no-store',
    })
    const data = await res.json()
    records = records.concat(data.records || [])
    offset = data.offset
  } while (offset)
  return records
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const start_date = searchParams.get('start_date')
  const end_date = searchParams.get('end_date')

  if (!start_date || !end_date) {
    return NextResponse.json({ error: 'Missing start_date or end_date' }, { status: 400 })
  }

  const queryStart = new Date(start_date)
  const queryEnd = new Date(end_date)

  try {
    const boatTypes = await fetchAll(BOAT_TYPES_TABLE, ['Boat type name', 'Total Fleet'])
    const fleetMap: Record<string, { name: string; total: number }> = {}
    for (const bt of boatTypes) {
      fleetMap[bt.id] = {
        name: bt.fields['Boat type name'],
        total: bt.fields['Total Fleet'] || 0,
      }
    }

    const reservations = await fetchAll(RESERVATIONS_TABLE, [
      'Type',
      'Sākuma datums (from Booking)',
      'Beigu datums (from Booking)',
      'Reservation Lines',
    ])

    const overlappingResIds = new Set<string>()
    for (const r of reservations) {
      const typeVal = r.fields['Type']
      const typeName = typeof typeVal === 'string' ? typeVal : typeVal?.name
      if (typeName === 'Hold') continue

      const startRaw = r.fields['Sākuma datums (from Booking)']
      const endRaw = r.fields['Beigu datums (from Booking)']

      let resStart: Date | undefined, resEnd: Date | undefined
      if (Array.isArray(startRaw)) resStart = new Date(startRaw[0])
      else if (startRaw?.valuesByLinkedRecordId) {
        const vals = Object.values(startRaw.valuesByLinkedRecordId) as any[]
        resStart = new Date(vals[0]?.[0])
      }
      if (Array.isArray(endRaw)) resEnd = new Date(endRaw[0])
      else if (endRaw?.valuesByLinkedRecordId) {
        const vals = Object.values(endRaw.valuesByLinkedRecordId) as any[]
        resEnd = new Date(vals[0]?.[0])
      }

      if (!resStart || !resEnd || isNaN(resStart.getTime()) || isNaN(resEnd.getTime())) continue
      if (resStart <= queryEnd && resEnd >= queryStart) overlappingResIds.add(r.id)
    }

    const reserved: Record<string, number> = {}
    if (overlappingResIds.size > 0) {
      const resLines = await fetchAll(RES_LINES_TABLE, ['Reservations', 'Boat Types', 'Quantity'])
      for (const line of resLines) {
        const resId = line.fields['Reservations']?.[0]
        const btId = line.fields['Boat Types']?.[0]
        const qty = line.fields['Quantity'] || 0
        if (!resId || !btId || !overlappingResIds.has(resId)) continue
        reserved[btId] = (reserved[btId] || 0) + qty
      }
    }

    const availability: Record<string, { name: string; total: number; booked: number; available: number }> = {}
    for (const [id, { name, total }] of Object.entries(fleetMap)) {
      availability[id] = {
        name,
        total,
        booked: reserved[id] || 0,
        available: Math.max(0, total - (reserved[id] || 0)),
      }
    }

    return NextResponse.json({ start_date, end_date, availability })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
