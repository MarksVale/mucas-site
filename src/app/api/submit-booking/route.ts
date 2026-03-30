import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const AIRTABLE_PAT = process.env.AIRTABLE_PAT
const BASE_ID = 'appYaHUWSdtuUSeaB'
const BOOKINGS_TABLE = 'tblXNo5L3RXt0fQVJ'
const BOOKING_LINES_TABLE = 'tblW1pCMNNHvNszEw'
const RESERVATIONS_TABLE = 'tblgrNXzhAyDx2JSM'
const RES_LINES_TABLE = 'tblPYvExPEx5GIqgK'
const BOAT_STOCK_TABLE = 'tblEBC4kim6uCheAX'

async function airtableGet(tableId: string, params = '') {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}${params}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_PAT}` },
    cache: 'no-store',
  })
  return res.json()
}

async function airtablePost(tableId: string, fields: Record<string, unknown>) {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${AIRTABLE_PAT}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
  })
  return res.json()
}

async function getAllRecords(tableId: string, fields: string[]) {
  const allRecords: any[] = []
  let offset: string | null = null
  const fieldParams = fields.map(f => `fields[]=${encodeURIComponent(f)}`).join('&')
  do {
    const url = `?${fieldParams}${offset ? `&offset=${offset}` : ''}`
    const data = await airtableGet(tableId, url)
    if (data.records) allRecords.push(...data.records)
    offset = data.offset || null
  } while (offset)
  return allRecords
}

export async function POST(req: NextRequest) {
  try {
    const {
      firstName, lastName, email, phone,
      riverId, routeId, startDate, endDate,
      boatSelections, transportCost, startTime, notes, paymentMethod,
    } = await req.json()

    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.round((end.getTime() - start.getTime()) / 86400000) + 1

    // Step 1: Get total fleet stock per boat type
    const stockRecords = await getAllRecords(BOAT_STOCK_TABLE, ['Boat Type', 'Total Quantity'])
    const totalStock: Record<string, number> = {}
    for (const s of stockRecords) {
      const btId = s.fields['Boat Type']?.[0]
      const qty = s.fields['Total Quantity'] || 0
      if (btId) totalStock[btId] = (totalStock[btId] || 0) + qty
    }

    // Step 2: Get overlapping confirmed reservations
    const filter = encodeURIComponent(
      `AND(IS_BEFORE({Sākuma datums (from Booking)}, "${endDate}"), IS_AFTER({Beigu datums (from Booking)}, "${startDate}"), {Type} = "Customer")`
    )
    const resResponse = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${RESERVATIONS_TABLE}?filterByFormula=${filter}&fields[]=Reservation Lines`,
      { headers: { Authorization: `Bearer ${AIRTABLE_PAT}` }, cache: 'no-store' }
    )
    const resData = await resResponse.json()
    const overlappingResIds = new Set((resData.records || []).map((r: any) => r.id))

    // Step 3: Sum reserved quantities from overlapping reservation lines
    const reservedQty: Record<string, number> = {}
    if (overlappingResIds.size > 0) {
      const resLines = await getAllRecords(RES_LINES_TABLE, ['Reservations', 'Boat Types', 'Quantity'])
      for (const line of resLines) {
        const resId = line.fields['Reservations']?.[0]
        const btId = line.fields['Boat Types']?.[0]
        const qty = line.fields['Quantity'] || 0
        if (!resId || !btId) continue
        if (!overlappingResIds.has(resId)) continue
        reservedQty[btId] = (reservedQty[btId] || 0) + qty
      }
    }

    // Step 4: Check for overbooking
    const shortReasons: string[] = []
    for (const [btId, qty] of Object.entries(boatSelections || {})) {
      if (parseInt(qty as string) <= 0) continue
      const needed = parseInt(qty as string)
      const available = (totalStock[btId] || 0) - (reservedQty[btId] || 0)
      if (available < needed) {
        shortReasons.push(`Boat type ${btId}: need ${needed}, available ${available}`)
      }
    }
    const overbookedReason = shortReasons.length > 0 ? shortReasons.join('; ') : null

    // Step 5: Create booking
    const bookingFields: Record<string, unknown> = {
      'Vārds': firstName,
      'Uzvārds': lastName,
      'E-pasts': email,
      'Numurs': phone,
      'River': [riverId],
      'Route': [routeId],
      'Sākuma datums': startDate,
      'Beigu datums': endDate,
      'Sākuma laiks': startTime || '',
      'Dienas': days,
      'Notes': notes || '',
      'Transporta izmaksas': transportCost || 0,
      'Payment Method': paymentMethod || 'Cash',
      'Status': overbookedReason ? 'Overbooked' : 'Pending',
    }
    if (overbookedReason) {
      bookingFields['Notes'] = `[OVERBOOKED] ${overbookedReason}\n\n${notes || ''}`.trim()
    }

    const bookingData = await airtablePost(BOOKINGS_TABLE, bookingFields)
    if (!bookingData.id) {
      return NextResponse.json(
        { error: bookingData.error?.message || JSON.stringify(bookingData) },
        { status: 400 }
      )
    }
    const bookingId = bookingData.id

    // Step 6: Create booking lines
    for (const [boatTypeId, qty] of Object.entries(boatSelections || {})) {
      if (parseInt(qty as string) <= 0) continue
      await airtablePost(BOOKING_LINES_TABLE, {
        'Booking': [bookingId],
        'Boat Type': [boatTypeId],
        'Quantity': parseInt(qty as string),
      })
    }

    return NextResponse.json({
      success: true,
      id: bookingId,
      overbooked: !!overbookedReason,
      reason: overbookedReason || null,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
