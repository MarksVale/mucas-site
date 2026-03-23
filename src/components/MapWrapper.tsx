'use client'

import dynamic from 'next/dynamic'

const RouteMap = dynamic(() => import('./RouteMap'), { ssr: false })

interface Props {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  label: string
}

export default function MapWrapper(props: Props) {
  return <RouteMap {...props} />
}
