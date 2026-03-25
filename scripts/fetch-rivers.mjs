#!/usr/bin/env node
/**
 * Fetches full river geometry from Overpass API for all 4 rivers,
 * orders the way segments, and saves as JSON files.
 * Run: node scripts/fetch-rivers.mjs
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'data', 'rivers')

const RIVERS = [
  // Split Gauja into upper and lower to avoid Overpass timeout
  { name: 'Gauja', file: 'gauja-mid', bbox: '57.15,24.85,57.35,25.3' },
  { name: 'Gauja', file: 'gauja-lower', bbox: '57.05,24.7,57.18,24.9' },
]

const ENDPOINT = 'https://overpass.kumi.systems/api/interpreter'

async function fetchRiver(riverName, bbox) {
  // Query both ways and relations for the river
  const query = `[out:json][timeout:60][bbox:${bbox}];(way["waterway"="river"]["name"="${riverName}"];);out geom;`

  console.log(`Fetching ${riverName}...`)
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  })

  if (!res.ok) throw new Error(`Overpass returned ${res.status} for ${riverName}`)
  const data = await res.json()

  // Extract way segments with their geometry
  const ways = data.elements
    .filter(el => el.type === 'way' && el.geometry && el.geometry.length > 0)
    .map(el => ({
      id: el.id,
      coords: el.geometry.map(n => [n.lat, n.lon]),
    }))

  console.log(`  Found ${ways.length} way segments`)

  // Order segments by connecting endpoints
  const ordered = orderWays(ways)

  // Flatten into a single coordinate array
  const coords = []
  for (const seg of ordered) {
    for (let i = 0; i < seg.length; i++) {
      // Skip first point of subsequent segments (shared with previous)
      if (coords.length > 0 && i === 0) continue
      coords.push(seg[i])
    }
  }

  console.log(`  Ordered: ${coords.length} total points`)
  return coords
}

function dist(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)
}

function orderWays(ways) {
  if (ways.length === 0) return []

  const segments = ways.map(w => [...w.coords])
  const used = new Set()
  const result = []

  // Start with the first segment
  used.add(0)
  result.push(segments[0])

  let changed = true
  while (changed && used.size < segments.length) {
    changed = false
    const chainStart = result[0][0]
    const chainEnd = result[result.length - 1][result[result.length - 1].length - 1]

    let bestIdx = -1
    let bestDist = Infinity
    let bestMode = '' // 'append', 'append-rev', 'prepend', 'prepend-rev'

    for (let i = 0; i < segments.length; i++) {
      if (used.has(i)) continue
      const seg = segments[i]
      const segStart = seg[0]
      const segEnd = seg[seg.length - 1]

      // Try appending (end of chain → start of segment)
      const d1 = dist(chainEnd, segStart)
      if (d1 < bestDist) { bestDist = d1; bestIdx = i; bestMode = 'append' }

      // Try appending reversed
      const d2 = dist(chainEnd, segEnd)
      if (d2 < bestDist) { bestDist = d2; bestIdx = i; bestMode = 'append-rev' }

      // Try prepending (start of chain → end of segment)
      const d3 = dist(chainStart, segEnd)
      if (d3 < bestDist) { bestDist = d3; bestIdx = i; bestMode = 'prepend' }

      // Try prepending reversed
      const d4 = dist(chainStart, segStart)
      if (d4 < bestDist) { bestDist = d4; bestIdx = i; bestMode = 'prepend-rev' }
    }

    if (bestIdx >= 0 && bestDist < 0.01) { // ~1km threshold
      used.add(bestIdx)
      changed = true
      const seg = segments[bestIdx]

      if (bestMode === 'append') result.push(seg)
      else if (bestMode === 'append-rev') result.push([...seg].reverse())
      else if (bestMode === 'prepend') result.unshift(seg)
      else if (bestMode === 'prepend-rev') result.unshift([...seg].reverse())
    }
  }

  console.log(`  Used ${used.size}/${segments.length} segments`)
  return result
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  for (const river of RIVERS) {
    try {
      const coords = await fetchRiver(river.name, river.bbox)
      const outPath = join(OUT_DIR, `${river.file}.json`)
      writeFileSync(outPath, JSON.stringify(coords))
      console.log(`  Saved ${outPath} (${(JSON.stringify(coords).length / 1024).toFixed(1)} KB)`)
    } catch (err) {
      console.error(`  ERROR for ${river.name}:`, err.message)
    }
    // Be nice to Overpass API — longer delay to avoid 429
    await new Promise(r => setTimeout(r, 8000))
  }

  console.log('Done!')
}

main()
