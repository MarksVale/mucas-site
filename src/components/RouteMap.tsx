'use client'

import { useEffect, useRef } from 'react'

interface RouteMapProps {
  startCoords: [number, number]
  endCoords: [number, number]
  startLabel: string
  endLabel: string
}

export default function RouteMap({ startCoords, endCoords, startLabel, endLabel }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    let cancelled = false

    async function init() {
      const L = (await import('leaflet')).default

      if (cancelled || !mapRef.current) return

      // Fix default marker icons (Leaflet + bundlers issue)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Calculate bounds
      const bounds = L.latLngBounds([startCoords, endCoords])
      const center = bounds.getCenter()

      const map = L.map(mapRef.current, {
        center: [center.lat, center.lng],
        scrollWheelZoom: false,
        attributionControl: true,
      })

      // Fit to show both markers with padding
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      // Custom icons
      const startIcon = L.divIcon({
        className: 'route-marker route-marker-start',
        html: '<div class="marker-pin start-pin"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const endIcon = L.divIcon({
        className: 'route-marker route-marker-end',
        html: '<div class="marker-pin end-pin"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      L.marker(startCoords, { icon: startIcon })
        .addTo(map)
        .bindPopup(`<strong>Start:</strong> ${startLabel}`)

      L.marker(endCoords, { icon: endIcon })
        .addTo(map)
        .bindPopup(`<strong>Finish:</strong> ${endLabel}`)

      // Draw a dashed line between start and end
      L.polyline([startCoords, endCoords], {
        color: '#24943A',
        weight: 3,
        opacity: 0.6,
        dashArray: '8, 8',
      }).addTo(map)

      mapInstanceRef.current = map
    }

    init()

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove()
        mapInstanceRef.current = null
      }
    }
  }, [startCoords, endCoords, startLabel, endLabel])

  return <div ref={mapRef} className="route-map" />
}
