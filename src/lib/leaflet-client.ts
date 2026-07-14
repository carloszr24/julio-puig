import L from 'leaflet'

let configured = false

export function configureLeafletIcons() {
  if (configured || typeof window === 'undefined') return

  delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })

  configured = true
}

export const CORIA_DEL_RIO_CENTER: [number, number] = [37.287, -6.054]
export const DEFAULT_MAP_ZOOM = 14
