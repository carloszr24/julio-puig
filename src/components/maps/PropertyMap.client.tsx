'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import { CORIA_DEL_RIO_CENTER, DEFAULT_MAP_ZOOM, configureLeafletIcons } from '@/lib/leaflet-client'
import type { PropertyMapPoint } from '@/lib/property-map'

type DraggableMarker = {
  latitude: number
  longitude: number
  onMove: (latitude: number, longitude: number) => void
}

type Props = {
  points?: PropertyMapPoint[]
  className?: string
  draggable?: DraggableMarker | null
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function buildPopupHtml(point: PropertyMapPoint) {
  const image = point.imageUrl
    ? `<img src="${escapeHtml(point.imageUrl)}" alt="" style="width:100%;height:96px;object-fit:cover;border-radius:4px;margin-bottom:8px" />`
    : ''
  return `
    ${image}
    <strong style="display:block;font-size:14px;margin-bottom:4px">${escapeHtml(point.title)}</strong>
    <span style="display:block;font-size:13px;color:#601b2e;margin-bottom:6px">${escapeHtml(formatPrice(point.price, point.operation || 'venta'))}</span>
    <span style="display:block;font-size:12px;color:#78716c;margin-bottom:8px">${escapeHtml(point.location)}</span>
    <a href="/propiedades/${escapeHtml(point.id)}" style="font-size:12px;color:#601b2e;text-decoration:underline">Ver ficha</a>
  `
}

export default function PropertyMap({ points = [], className, draggable = null }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const draggableMarkerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    configureLeafletIcons()
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
    }).setView(CORIA_DEL_RIO_CENTER, DEFAULT_MAP_ZOOM)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    mapRef.current = map
    markersLayerRef.current = L.layerGroup().addTo(map)

    return () => {
      map.remove()
      mapRef.current = null
      markersLayerRef.current = null
      draggableMarkerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const layer = markersLayerRef.current
    if (!map || !layer) return

    layer.clearLayers()
    draggableMarkerRef.current?.remove()
    draggableMarkerRef.current = null

    if (draggable) {
      const marker = L.marker([draggable.latitude, draggable.longitude], { draggable: true }).addTo(map)
      draggableMarkerRef.current = marker
      marker.on('dragend', () => {
        const position = marker.getLatLng()
        draggable.onMove(position.lat, position.lng)
      })
      map.setView([draggable.latitude, draggable.longitude], 16)
      return
    }

    if (points.length === 0) {
      map.setView(CORIA_DEL_RIO_CENTER, DEFAULT_MAP_ZOOM)
      return
    }

    const bounds = L.latLngBounds([])
    for (const point of points) {
      const marker = L.marker([point.latitude, point.longitude])
      marker.bindPopup(buildPopupHtml(point))
      marker.addTo(layer)
      bounds.extend([point.latitude, point.longitude])
    }

    if (points.length === 1) {
      map.setView([points[0].latitude, points[0].longitude], 15)
    } else {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 })
    }
  }, [points, draggable])

  return (
    <div
      ref={containerRef}
      className={cn('w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100', className)}
      style={{ minHeight: 280 }}
    />
  )
}
