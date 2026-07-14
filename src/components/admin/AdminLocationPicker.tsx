'use client'

import { useEffect, useRef, useState } from 'react'
import { PropertyMap } from '@/components/maps/PropertyMapLoader'

type Props = {
  address: string
  province: string
  latitude: string
  longitude: string
  onAddressChange: (value: string) => void
  onCoordinatesChange: (latitude: string, longitude: string) => void
}

export function AdminLocationPicker({
  address,
  province,
  latitude,
  longitude,
  onAddressChange,
  onCoordinatesChange,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastQueryRef = useRef('')
  const onCoordinatesChangeRef = useRef(onCoordinatesChange)

  onCoordinatesChangeRef.current = onCoordinatesChange

  useEffect(() => {
    if (address.trim() && latitude && longitude && lastQueryRef.current === '') {
      lastQueryRef.current = `${address.trim()}|${province}`
    }
  }, [address, latitude, longitude, province])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  useEffect(() => {
    const trimmed = address.trim()
    if (trimmed.length < 8) {
      setStatus('idle')
      setMessage(null)
      return
    }

    const queryKey = `${trimmed}|${province}`
    if (queryKey === lastQueryRef.current) return

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      lastQueryRef.current = queryKey
      setStatus('loading')
      setMessage('Buscando dirección…')

      try {
        const params = new URLSearchParams({ address: trimmed })
        if (province.trim()) params.set('province', province.trim())
        const res = await fetch(`/api/geocode?${params.toString()}`, { credentials: 'include' })
        const data = (await res.json().catch(() => ({}))) as {
          latitude?: number
          longitude?: number
          displayName?: string
          error?: string
        }

        if (!res.ok || data.latitude == null || data.longitude == null) {
          setStatus('error')
          setMessage(data.error || 'No se pudo ubicar la dirección')
          return
        }

        onCoordinatesChangeRef.current(String(data.latitude), String(data.longitude))
        setStatus('ok')
        setMessage(data.displayName ? `Ubicación encontrada: ${data.displayName}` : 'Ubicación encontrada')
      } catch {
        setStatus('error')
        setMessage('Error al geocodificar la dirección')
      }
    }, 900)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [address, province])

  const lat = parseFloat(latitude)
  const lng = parseFloat(longitude)
  const hasCoordinates = Number.isFinite(lat) && Number.isFinite(lng)

  return (
    <div className="md:col-span-2 space-y-3">
      <div>
        <label className="text-xs text-stone-500 block mb-1.5">Dirección para el mapa</label>
        <input
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="Ej: Calle Ejemplo 12, Puente Rojo, Coria del Río"
          className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900"
        />
        <p className="mt-1.5 text-xs text-stone-400">
          Al escribir la dirección, el pin se coloca automáticamente. Puede arrastrarlo para afinar la posición.
        </p>
      </div>

      {message && (
        <p
          className={
            status === 'error'
              ? 'text-xs text-red-500'
              : status === 'loading'
                ? 'text-xs text-stone-400'
                : 'text-xs text-emerald-700'
          }
        >
          {message}
        </p>
      )}

      {hasCoordinates ? (
        <PropertyMap
          className="h-[280px]"
          draggable={{
            latitude: lat,
            longitude: lng,
            onMove: (nextLat, nextLng) => {
              onCoordinatesChange(String(nextLat), String(nextLng))
              setStatus('ok')
              setMessage('Pin ajustado manualmente')
            },
          }}
        />
      ) : (
        <div className="flex h-[280px] items-center justify-center rounded-sm border border-dashed border-stone-200 bg-stone-50 px-6 text-center text-sm text-stone-400">
          Escribe una dirección completa para ver el mapa y colocar el pin
        </div>
      )}
    </div>
  )
}
