import 'server-only'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import type { Property } from '@/types'
import { normalizeExtraIds, syncLegacyExtraFields } from '@/lib/property-extras'

const DATA_DIR = join(process.cwd(), 'data')
const PROPERTIES_FILE = join(DATA_DIR, 'properties.json')
const LEADS_FILE = join(DATA_DIR, 'leads.json')

type StoredProperty = Omit<Property, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
}

function parseProperty(raw: StoredProperty): Property {
  return {
    ...raw,
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
  }
}

export function readLocalProperties(): Property[] {
  ensureDataDir()
  if (!existsSync(PROPERTIES_FILE)) return []
  const items = JSON.parse(readFileSync(PROPERTIES_FILE, 'utf8')) as StoredProperty[]
  return items.map(parseProperty)
}

export function writeLocalProperties(properties: Property[]) {
  ensureDataDir()
  const payload: StoredProperty[] = properties.map((property) => ({
    ...property,
    createdAt: property.createdAt.toISOString(),
    updatedAt: property.updatedAt.toISOString(),
  }))
  writeFileSync(PROPERTIES_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
}

export function slugifyPropertyId(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || `propiedad-${Date.now()}`
}

export type PropertyInput = {
  title: string
  price: string | number
  location: string
  address?: string | null
  latitude?: string | number | null
  longitude?: string | number | null
  province?: string | null
  type: string
  operation?: string
  status?: string
  description: string
  images: string | string[]
  fotocasaUrl?: string | null
  bedrooms?: string | number | null
  bathrooms?: string | number | null
  sqMeters?: string | number | null
  availability?: string | null
  hotWater?: string | null
  heating?: string | null
  condition?: string | null
  propertyAge?: string | null
  floor?: string | null
  garage?: string | null
  elevator?: string | null
  furnished?: string | null
  extras?: string[] | null
  energyRating?: string | null
  energyValue?: string | number | null
  emissionsRating?: string | null
  emissionsValue?: string | number | null
  featured?: boolean
}

function parseCoordinate(value: string | number | null | undefined): number | null {
  if (value === undefined || value === null || value === '') return null
  const parsed = typeof value === 'number' ? value : parseFloat(String(value))
  return Number.isFinite(parsed) ? parsed : null
}

export function inputToProperty(input: PropertyInput, existing?: Property): Property {
  const imagesStr = Array.isArray(input.images) ? JSON.stringify(input.images) : String(input.images)
  const extras = normalizeExtraIds(input.extras ?? [])
  const legacyExtras = syncLegacyExtraFields(extras)
  const now = new Date()

  return {
    id: existing?.id ?? slugifyPropertyId(input.title),
    title: input.title,
    price: typeof input.price === 'number' ? input.price : parseFloat(String(input.price)),
    location: input.location,
    address: input.address?.trim() || null,
    latitude: parseCoordinate(input.latitude),
    longitude: parseCoordinate(input.longitude),
    province: input.province?.trim() || null,
    type: input.type,
    operation: input.operation || 'venta',
    status: input.status || 'disponible',
    description: input.description,
    images: imagesStr,
    fotocasaUrl: input.fotocasaUrl?.trim() || null,
    bedrooms:
      input.bedrooms !== undefined && input.bedrooms !== '' && input.bedrooms !== null
        ? parseInt(String(input.bedrooms), 10)
        : null,
    bathrooms:
      input.bathrooms !== undefined && input.bathrooms !== '' && input.bathrooms !== null
        ? parseInt(String(input.bathrooms), 10)
        : null,
    sqMeters:
      input.sqMeters !== undefined && input.sqMeters !== '' && input.sqMeters !== null
        ? parseFloat(String(input.sqMeters))
        : null,
    availability: input.availability || null,
    hotWater: input.hotWater || null,
    heating: input.heating?.trim() || (extras.includes('heating') ? 'Sí' : null),
    condition: input.condition || null,
    propertyAge: input.propertyAge || null,
    floor: input.floor || null,
    garage: input.garage || legacyExtras.garage,
    elevator: input.elevator || legacyExtras.elevator,
    furnished: input.furnished || legacyExtras.furnished,
    extras,
    energyRating: input.energyRating || null,
    energyValue:
      input.energyValue !== undefined && input.energyValue !== '' && input.energyValue !== null
        ? parseFloat(String(input.energyValue))
        : null,
    emissionsRating: input.emissionsRating || null,
    emissionsValue:
      input.emissionsValue !== undefined && input.emissionsValue !== '' && input.emissionsValue !== null
        ? parseFloat(String(input.emissionsValue))
        : null,
    featured: Boolean(input.featured),
    archived: existing?.archived ?? false,
    sortOrder: existing?.sortOrder ?? readLocalProperties().length,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  }
}

export type StoredLead = {
  id: string
  fullName: string
  email?: string | null
  phone: string
  source: string
  intent: string
  status: string
  priority: string
  propertyRef?: string | null
  notes?: string | null
  saleTimeline?: string | null
  assignedTo?: string | null
  firstResponseAt?: string | null
  lastContactAt?: string | null
  createdAt: string
  updatedAt: string
}

export function readLocalLeads(): StoredLead[] {
  ensureDataDir()
  if (!existsSync(LEADS_FILE)) return []
  return JSON.parse(readFileSync(LEADS_FILE, 'utf8')) as StoredLead[]
}

export function writeLocalLeads(leads: StoredLead[]) {
  ensureDataDir()
  writeFileSync(LEADS_FILE, `${JSON.stringify(leads, null, 2)}\n`, 'utf8')
}

export function appendLocalLead(lead: Omit<StoredLead, 'id' | 'createdAt' | 'updatedAt'>): StoredLead {
  const leads = readLocalLeads()
  const now = new Date().toISOString()
  const row: StoredLead = {
    ...lead,
    id: `lead-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  }
  writeLocalLeads([row, ...leads])
  return row
}
