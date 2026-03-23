'use client'

import { useEffect } from 'react'

interface Props {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  label: string
}

export default function RouteMap({ startLat, startLng, endLat, endLng, label }: Props) {
  const id = 'route-map'

  useEffect(() => {
    // Dynamically import Leaflet so it never runs on the server
    let map: any = null

    import('leaflet').then((L) => {
      // Fix default marker icon paths (Leaflet + webpack issue)
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const container = document.getElementById(id)
      if (!container || (container as any)._leaflet_id) return

      // Fit bounds to show the full route
      const bounds = L.latLngBounds(
        [startLat, startLng],
        [endLat, endLng]
      )

      map = L.map(id).fitBounds(bounds, { padding: [48, 48] })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 17,
      }).addTo(map)

      // Start marker (green)
      const startIcon = L.divIcon({
        html: `<div style="background:#2d6a4f;color:white;border-radius:50% 50% 50% 0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;transform:rotate(-45deg);border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"><span style="transform:rotate(45deg)">S</span></div>`,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      })

      // End marker (red)
      const endIcon = L.divIcon({
        html: `<div style="background:#c0392b;color:white;border-radius:50% 50% 50% 0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;transform:rotate(-45deg);border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"><span style="transform:rotate(45deg)">F</span></div>`,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      })

      L.marker([startLat, startLng], { icon: startIcon })
        .addTo(map)
        .bindPopup(`<strong>Start</strong><br/>${label}`)

      L.marker([endLat, endLng], { icon: endIcon })
        .addTo(map)
        .bindPopup(`<strong>Finish</strong>`)

      // Dashed line connecting start → end
      L.polyline([[startLat, startLng], [endLat, endLng]], {
        color: '#2d6a4f',
        weight: 3,
        dashArray: '8 6',
        opacity: 0.8,
      }).addTo(map)
    })

    return () => {
      if (map) map.remove()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Leaflet CSS */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div id={id} style={{ width: '100%', height: 380, borderRadius: 12, zIndex: 0 }} />
    </>
  )
}
