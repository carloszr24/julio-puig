import { NextRequest, NextResponse } from 'next/server'
import { mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { optimizePropertyImage } from '@/lib/optimize-image'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  const propertyId = request.nextUrl.searchParams.get('propertyId')?.trim()
  if (!propertyId) return badRequest('Falta propertyId')

  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return badRequest('Falta file')
  if (!ALLOWED_TYPES.has(file.type)) return badRequest('Tipo no permitido (jpg/png/webp)')
  if (file.size > MAX_BYTES) return badRequest('La imagen supera 5MB')

  const originalBuffer = Buffer.from(await file.arrayBuffer())
  const optimized = await optimizePropertyImage(originalBuffer)
  const dir = join(process.cwd(), 'public', 'images', 'properties', propertyId)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  const filename = `${Date.now()}.${optimized.ext}`
  const diskPath = join(dir, filename)
  writeFileSync(diskPath, optimized.data)

  const publicUrl = `/images/properties/${propertyId}/${filename}`
  return NextResponse.json({ url: publicUrl, path: publicUrl })
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  return NextResponse.json(
    { error: 'Elimine la imagen del JSON de la propiedad en data/properties.json' },
    { status: 501 }
  )
}
