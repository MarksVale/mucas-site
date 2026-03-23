# Mučas Laivu Noma — Project Brief for Claude

## What this is
The new laivunoma.shop website — a Next.js static frontend for a Latvian boat rental company.
Replaces the old WordPress/Breakdance site entirely.

## Stack
- **Frontend**: Next.js 16 + TypeScript, static export, deployed on Vercel
- **Content**: Airtable (source of truth for all data)
- **Payments**: WooCommerce + MakeCommerce (dealbreaker — MakeCommerce only works via WooCommerce)
- **Styling**: Single CSS file (`src/styles/globals.css`), Montserrat font
- **Repo**: github.com/MarksVale/mucas-site (private)
- **Live URL**: mucas-site.vercel.app (will become laivunoma.shop)

## Airtable
- Base ID: appYaHUWSdtuUSeaB
- Tables: Rivers, Routes, Boat Types, Hubs, Bookings, Booking Windows, Boat Stock
- All data fetched in `src/lib/airtable.ts` — this is the ONLY file that talks to Airtable
- If no API key is set, fallback data is used (matches real Airtable content exactly)

## Color palette
- Forest Green: #24943A (primary)
- Carbon Black: #191716
- Sunflower Gold: #E7B236
- Warm Gray (body bg): #EDEEEB
- White Smoke (cards): #F6F6F4

## File structure
```
src/
  app/
    page.tsx          ← homepage
    booking/          ← booking form (currently mockup, needs WooCommerce integration)
    rivers/           ← rivers listing + /rivers/[slug] detail pages
    routes/           ← /routes/[slug] detail pages
    fleet/            ← boats & pricing
    about/
    contact/
  components/
    Nav.tsx           ← site navigation
    Footer.tsx        ← site footer
  lib/
    airtable.ts       ← ALL Airtable data fetching + fallback data
  styles/
    globals.css       ← ALL styles (one file)
```

## Real Airtable data
**Rivers (4 active):** Gauja (11 routes), Salaca (5 routes), Brasla (11 routes), Amata (2 routes)
**Hubs:** Sigulda (Central), Mazsalaca (Regional), Staicele (Regional)
**Active boats (11):**
- Kayaks: Kajaks VISTA (2 seats, €20/day), Perception PESCADOR (1 seat, €15/day)
- Canoes: Kanoe LOXIA, ROTOATTIVO CANADIER 3, ALBA, PELICAN (3 seats, €20/day)
- SUP: SUP Bee (1 seat, €20/day)
- Rafts: DULKAN Amata 300 (2 seats, €35), BUSH Venta 300 (3 seats, €35), DULKAN Raft 330 (4 seats, €45), DULKAN Raft 460 (9 seats, €65)

## Key decisions made
- No WordPress theme — pure Next.js static site
- WooCommerce stays on a subdomain (e.g. checkout.laivunoma.shop) only for payments
- Booking form on this site → redirects to WooCommerce checkout
- i18n: build in English first, translate to Latvian (LV) last
- Booking form: after submit → summary page (not direct to checkout)
- Multiple CTAs across all pages lead to /booking

## What still needs doing
- [ ] Booking form: wire up to WooCommerce (submit → summary → WooCommerce checkout)
- [ ] Airtable webhook → Vercel rebuild trigger (so content changes auto-deploy)
- [ ] i18n EN/LV (last step)
- [ ] Real photos (replacing gradient placeholders)
- [ ] Set AIRTABLE_API_KEY env var in Vercel for live data

## How to deploy changes
1. Edit files locally or in this session
2. `git add -A && git commit -m "description" && git push`
3. Vercel auto-deploys within ~30 seconds

## Owner
Mark — marks.vale@gmail.com
GitHub: MarksVale
