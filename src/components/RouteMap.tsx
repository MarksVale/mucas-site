'use client'

import { useEffect, useRef } from 'react'

interface Props {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  label: string
  riverSlug: string
}

/** River geometry JSON files in /public/data/rivers/ */
function getRiverFiles(riverSlug: string): string[] {
  switch (riverSlug) {
    case 'gauja':
      return ['/data/rivers/gauja-upper.json', '/data/rivers/gauja-mid.json', '/data/rivers/gauja-lower.json']
    case 'salaca':
      return ['/data/rivers/salaca.json']
    case 'brasla':
      return ['/data/rivers/brasla.json']
    case 'amata':
      return ['/data/rivers/amata.json']
    default:
      return []
  }
}

/** Find closest point index on the river coords array */
function closestIdx(coords: [number, number][], lat: number, lng: number): number {
  let best = 0
  let bestD = Infinity
  for (let i = 0; i < coords.length; i++) {
    const d = (coords[i][0] - lat) ** 2 + (coords[i][1] - lng) ** 2
    if (d < bestD) { bestD = d; best = i }
  }
  return best
}

export default function RouteMap({ startLat, startLng, endLat, endLng, label, riverSlug }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (mapRef.current) return // already initialized

    import('leaflet').then(async (L) => {
      if (!containerRef.current) return

      // Fix default marker icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Fit bounds to start/end with padding
      const bounds = L.latLngBounds([startLat, startLng], [endLat, endLng])
      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).fitBounds(bounds, { padding: [60, 60] })
      mapRef.current = map

      // Use a cleaner, nature-themed tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 17,
      }).addTo(map)

      // --- Load and draw river path ---
      const files = getRiverFiles(riverSlug)
      if (files.length > 0) {
        try {
          const allCoords: [number, number][] = []
          for (const f of files) {
            const res = await fetch(f)
            if (res.ok) {
              const data: [number, number][] = await res.json()
              allCoords.push(...data)
            }
          }

          if (allCoords.length > 0) {
            // Find the segment between start and end
            const startIdx = closestIdx(allCoords, startLat, startLng)
            const endIdx = closestIdx(allCoords, endLat, endLng)
            const fromIdx = Math.min(startIdx, endIdx)
            const toIdx = Math.max(startIdx, endIdx)

            // Extract the route segment with some buffer
            const bufferPts = 20
            const segStart = Math.max(0, fromIdx - bufferPts)
            const segEnd = Math.min(allCoords.length - 1, toIdx + bufferPts)
            const segment = allCoords.slice(segStart, segEnd + 1)

            if (segment.length > 1) {
              // Draw the full river faintly in the background
              const fullRiverLatLngs = allCoords.map(c => L.latLng(c[0], c[1]))
              L.polyline(fullRiverLatLngs, {
                color: '#5b9bd5',
                weight: 2,
                opacity: 0.2,
                smoothFactor: 1.5,
              }).addTo(map)

              // Draw the route segment prominently
              const segLatLngs = segment.map(c => L.latLng(c[0], c[1]))
              L.polyline(segLatLngs, {
                color: '#2980b9',
                weight: 4,
                opacity: 0.85,
                smoothFactor: 1.2,
                lineCap: 'round',
                lineJoin: 'round',
              }).addTo(map)

              // Fit to the segment bounds
              const segBounds = L.latLngBounds(segLatLngs)
              map.fitBounds(segBounds, { padding: [60, 60] })
            }
          }
        } catch (err) {
          console.warn('Failed to load river path:', err)
          // Fall back to dashed line
          L.polyline([[startLat, startLng], [endLat, endLng]], {
            color: '#2980b9',
            weight: 3,
            dashArray: '8 6',
            opacity: 0.6,
          }).addTo(map)
        }
      }

      // --- Custom markers ---
      // Start marker (green circle with "S")
      const startIcon = L.divIcon({
        html: `<div style="
          background: #24943A;
          color: white;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        ">S</div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      // End marker (accent gold with "F")
      const endIcon = L.divIcon({
        html: `<div style="
          background: #E7B236;
          color: white;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        ">F</div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      L.marker([startLat, startLng], { icon: startIcon })
        .addTo(map)
        .bindPopup(`<div style="font-family:'Montserrat',sans-serif;text-align:center"><strong style="color:#24943A">Start</strong><br/><span style="font-size:13px;color:#4a4845">${label}</span></div>`)

      L.marker([endLat, endLng], { icon: endIcon })
        .addTo(map)
        .bindPopup(`<div style="font-family:'Montserrat',sans-serif;text-align:center"><strong style="color:#E7B236">Finish</strong></div>`)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div className="route-map-container">
        <div ref={containerRef} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
      </div>
    </>
  )
}
