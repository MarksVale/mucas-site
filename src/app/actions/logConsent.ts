'use server'

import { headers } from 'next/headers'
import { WAIVER_VERSION } from '@/app/[locale]/waiver/page'

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appYaHUWSdtuUSeaB'
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || ''
const CONSENT_TABLE = 'Consent Records'

export interface ConsentPayload {
  name: string
  email: string
  phone: string
  route: string
  tripDate: string
  numBoats: string
  notes: string
  locale: string
  waiverAgreed: boolean
}

export async function logConsent(payload: ConsentPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const headersList = await headers()

    // Get IP — Vercel sets x-forwarded-for
    const forwarded = headersList.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

    const consentId = `consent_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const timestamp = new Date().toISOString()

    const record = {
      fields: {
        'Consent ID':       consentId,
        'Timestamp (UTC)':  timestamp,
        'Full Name':        payload.name,
        'Email':            payload.email,
        'Phone':            payload.phone,
        'IP Address':       ip,
        'Locale':           payload.locale,
        'Route':            payload.route,
        'Trip Date':        payload.tripDate || '',
        'Number of Boats':  payload.numBoats,
        'Waiver Version':   WAIVER_VERSION,
        'Waiver Agreed':    payload.waiverAgreed,
        'Notes':            payload.notes || '',
      },
    }

    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(CONSENT_TABLE)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('Consent log failed:', res.status, err)
      return { ok: false, error: 'Failed to log consent' }
    }

    return { ok: true }
  } catch (e) {
    console.error('logConsent error:', e)
    return { ok: false, error: 'Server error' }
  }
}
