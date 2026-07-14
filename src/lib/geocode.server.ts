import 'server-only'

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'
const USER_AGENT = 'JulioPuigRealEstate/1.0 (https://julio-puig.vercel.app)'

export type GeocodeResult = {
  latitude: number
  longitude: number
  displayName: string
}

export async function geocodeAddress(query: string): Promise<GeocodeResult | null> {
  const trimmed = query.trim()
  if (trimmed.length < 5) return null

  const url = new URL(NOMINATIM_URL)
  url.searchParams.set('q', trimmed)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', '1')
  url.searchParams.set('countrycodes', 'es')

  const response = await fetch(url.toString(), {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'application/json',
    },
    next: { revalidate: 60 * 60 * 24 },
  })

  if (!response.ok) return null

  const data = (await response.json()) as Array<{ lat: string; lon: string; display_name: string }>
  const hit = data[0]
  if (!hit) return null

  const latitude = parseFloat(hit.lat)
  const longitude = parseFloat(hit.lon)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null

  return {
    latitude,
    longitude,
    displayName: hit.display_name,
  }
}

export function buildGeocodeQuery(address: string, province?: string | null): string {
  const parts = [address.trim()]
  if (province?.trim()) parts.push(province.trim())
  parts.push('España')
  return parts.filter(Boolean).join(', ')
}
