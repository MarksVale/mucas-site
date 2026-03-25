#!/usr/bin/env node
/**
 * Snaps approximate town coordinates to the nearest point on the actual river path.
 * Uses the pre-fetched river geometry JSON files.
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'public', 'data', 'rivers')

// Load all river geometry
function loadRiver(name) {
  const files = name === 'gauja'
    ? ['gauja-upper.json', 'gauja-mid.json', 'gauja-lower.json']
    : [`${name}.json`]

  let coords = []
  for (const f of files) {
    try {
      const data = JSON.parse(readFileSync(join(DATA_DIR, f), 'utf-8'))
      coords = coords.concat(data)
    } catch (e) {
      console.warn(`  Warning: ${f} not found`)
    }
  }
  return coords
}

function dist(a, b) {
  const dlat = (a[0] - b[0]) * 111000 // rough meters
  const dlng = (a[1] - b[1]) * 111000 * Math.cos(a[0] * Math.PI / 180)
  return Math.sqrt(dlat * dlat + dlng * dlng)
}

function snapToRiver(lat, lng, riverCoords) {
  let bestDist = Infinity
  let bestPoint = null
  let bestIdx = -1

  for (let i = 0; i < riverCoords.length; i++) {
    const d = dist([lat, lng], riverCoords[i])
    if (d < bestDist) {
      bestDist = d
      bestPoint = riverCoords[i]
      bestIdx = i
    }
  }

  return { lat: bestPoint[0], lng: bestPoint[1], dist: Math.round(bestDist), idx: bestIdx }
}

// Approximate town coordinates (from research + Google Maps)
const POINTS = {
  gauja: {
    'strenci':    { lat: 57.6255, lng: 25.6867 },
    'valmiera':   { lat: 57.5380, lng: 25.4260 },
    'grivini':    { lat: 57.4470, lng: 25.3830 },
    'cesis':      { lat: 57.3130, lng: 25.2690 },
    'ligatne':    { lat: 57.2350, lng: 25.0400 },
    'sigulda':    { lat: 57.1600, lng: 24.8530 },
    'ramkalni':   { lat: 57.0750, lng: 24.7450 },
    'janramis':   { lat: 57.3370, lng: 25.2320 },
  },
  salaca: {
    'mazsalaca':       { lat: 57.8610, lng: 25.0500 },
    'licu-skola':      { lat: 57.8440, lng: 24.9800 },
    'staicele':        { lat: 57.8370, lng: 24.7710 },
    'salacgriva':      { lat: 57.7536, lng: 24.3581 },
    'sarkanas-klintis': { lat: 57.8320, lng: 24.6650 },
    'viku-tilts':      { lat: 57.8430, lng: 24.9000 },
  },
  brasla: {
    'rozula':        { lat: 57.3350, lng: 25.0400 },
    'placis':        { lat: 57.3050, lng: 25.0120 },
    'vejini':        { lat: 57.2750, lng: 24.9850 },
    'a3-tilts':      { lat: 57.2100, lng: 24.9080 },
    'straupe':       { lat: 57.3380, lng: 25.0240 },
    'ieteka-gauja':  { lat: 57.1770, lng: 24.8830 },
  },
  amata: {
    'melturi':        { lat: 57.2930, lng: 25.1830 },
    'zvartes-iezis':  { lat: 57.2750, lng: 25.1340 },
    'veclacu-tilts':  { lat: 57.2700, lng: 25.0900 },
  },
}

console.log('Snapping coordinates to river paths...\n')

const snapped = {}

for (const [river, points] of Object.entries(POINTS)) {
  const riverCoords = loadRiver(river)
  console.log(`${river}: ${riverCoords.length} river points loaded`)

  for (const [name, approx] of Object.entries(points)) {
    const result = snapToRiver(approx.lat, approx.lng, riverCoords)
    snapped[name] = { lat: +result.lat.toFixed(5), lng: +result.lng.toFixed(5) }
    const distLabel = result.dist < 1000 ? `${result.dist}m` : `${(result.dist/1000).toFixed(1)}km`
    console.log(`  ${name}: [${approx.lat}, ${approx.lng}] → [${result.lat.toFixed(5)}, ${result.lng.toFixed(5)}] (${distLabel} snap)`)
  }
}

console.log('\n--- Snapped coordinates ---')
console.log(JSON.stringify(snapped, null, 2))
