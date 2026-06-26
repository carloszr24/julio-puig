import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, '.env'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z_]+)=(.*)$/)
      if (!m) continue
      const val = m[2].replace(/^["']|["']$/g, '')
      if (!process.env[m[1]]) process.env[m[1]] = val
    }
  } catch {
    // .env optional if vars already exported
  }
}

loadEnv()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const now = '2026-05-28T12:00:00.000Z'

const rows = [
  {
    id: 'alcorcon-fuente-cisneros',
    title: 'Piso de 3 dormitorios en Fuente Cisneros, Alcorcón',
    price: 450_000,
    location: 'Alcorcón (Madrid)',
    type: 'piso',
    operation: 'venta',
    status: 'disponible',
    description: `Ref: 555768252 · Ref: 920.

En la exclusiva y tranquila zona de Fuente Cisneros, en Alcorcón, a escasos minutos de Móstoles y el Parque Oeste, se vende esta fantástica vivienda de 3 dormitorios y 2 baños completos, uno de ellos en suite.

El piso cuenta con puerta de acceso acorazada, suelo porcelánico en todas las estancias, ventanas climalit oscilobatientes, aire acondicionado por conductos, calefacción de gas natural con caldera nueva, tomas de internet en todas las habitaciones y terraza cerrada con vistas a zonas comunes.

La urbanización dispone de dos piscinas, dos pistas de pádel, zonas infantiles, mesas de ping-pong, salas de reunión, Citibox y portería con vigilancia 24 h.

Incluye trastero (~6 m²), plaza de garaje (~40 m², dos vehículos) e instalación para cargador de vehículo eléctrico. Portal con doble ascensor.

Contacto: Angel · 606 62 07 76.`,
    images: JSON.stringify([
      '/images/casa-alcorcon-1.webp',
      '/images/casa-alcorcon-2.webp',
      '/images/casa-alcorcon-3.webp',
    ]),
    fotocasa_url:
      'https://www.fotocasa.es/es/comprar/vivienda/alcorcon/aire-acondicionado-calefaccion-terraza-zona-comunitaria-ascensor-internet-piscina-no-amueblado/187435568/d',
    bedrooms: 3,
    bathrooms: 2,
    sq_meters: 117,
    availability: 'Sin restricciones',
    hot_water: 'Gas natural',
    heating: 'Gas natural',
    condition: 'Buen estado',
    floor: '2ª planta',
    garage: 'Plaza de garaje (2 vehículos)',
    elevator: 'Sí',
    furnished: 'No',
    featured: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'solar-navaltoril',
    title: 'Solar en Navaltoril, Robledo del Mazo',
    price: 35_000,
    location: 'Navaltoril, Robledo del Mazo (Toledo)',
    type: 'terreno',
    operation: 'venta',
    status: 'disponible',
    description: `Ref: 595285839 · Ref: 301.

Solar en Navaltoril, pedanía de Robledo del Mazo, vallado y de semiesquina. Superficie de 625 m².

Posibilidad de adquirir, de manera adicional, otro solar de semiesquina de 625 m² justo enfrente de la vivienda por 40.000 € adicionales (consultar con la agencia).

Zona inmejorable en el Valle del Gévalo, Parque Natural de Cabañeros.

Contacto: Angel · 606 62 07 76.`,
    images: JSON.stringify([
      '/images/solar_navaltoril_1.png',
      '/images/solar_navaltoril_2.png',
      '/images/solar_navaltoril_3.png',
    ]),
    fotocasa_url: 'https://www.fotocasa.es/es/comprar/terrenos/robledo-del-mazo/todas-las-zonas/l',
    sq_meters: 625,
    availability: 'Sin restricciones',
    featured: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: 'casa-navaltoril-robledo',
    title: 'Casa con parcela en Navaltoril, Robledo del Mazo',
    price: 140_000,
    location: 'Robledo del Mazo (Toledo)',
    type: 'casa',
    operation: 'venta',
    status: 'disponible',
    description: `En Navaltoril, pedanía de Robledo del Mazo, en un paraje de ensueño, se vende esta magnífica casa de altos techos con 4 habitaciones y baño con plato de ducha.

Completan la vivienda la zona de tránsito con dos armarios empotrados, el salón-comedor y una cocina con chimenea de piedra (también calefacción por gasóleo).

Parcela de 372 m², circundada por muro y con portón de acceso. En el exterior: porche, patio con horno-barbacoa y dos edificios anejos de almacén.

Desde el patio hay acceso a finca agrícola «Las Hoyas» (+2.100 m²), que se vende de manera conjunta con la vivienda.

Posibilidad de adquirir solar adicional de 625 m² enfrente por 40.000 € (consultar).

Certificación energética G.

Contacto: Angel · 606 62 07 76.`,
    images: JSON.stringify([
      '/images/casa_chalet_robledo_mazo_1.webp',
      '/images/casa_chalet_robledo_mazo_2.webp',
      '/images/casa_chalet_robledo_mazo.webp',
    ]),
    fotocasa_url:
      'https://www.fotocasa.es/es/comprar/vivienda/robledo-del-mazo/calefaccion-patio-amueblado/189680916/d',
    bedrooms: 4,
    bathrooms: 1,
    sq_meters: 372,
    availability: 'Sin restricciones',
    hot_water: 'Gasóleo',
    heating: 'Gasóleo',
    condition: 'Buen estado',
    elevator: 'No',
    furnished: 'Sí',
    energy_rating: 'G',
    energy_value: 999,
    emissions_rating: 'G',
    emissions_value: 999,
    featured: true,
    created_at: now,
    updated_at: now,
  },
]

const { error } = await supabase.from('properties').upsert(rows, { onConflict: 'id' })
if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}

const { count } = await supabase.from('properties').select('*', { count: 'exact', head: true })
console.log(`Seeded ${rows.length} properties. Total in DB: ${count}`)
