import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { wouldExceedFeaturedHomeLimit } from '@/lib/property-constants'
import {
  inputToProperty,
  readLocalProperties,
  writeLocalProperties,
} from '@/lib/local-store.server'
import { getPropertyById } from '@/lib/properties-store'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id)
  if (!property) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  return NextResponse.json(property)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  let body: Parameters<typeof inputToProperty>[0]
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const current = readLocalProperties()
  const existing = current.find((item) => item.id === params.id)
  if (!existing) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })

  const property = inputToProperty(body, existing)
  property.id = params.id

  if (wouldExceedFeaturedHomeLimit(current, { wantFeatured: property.featured, editingPropertyId: params.id })) {
    return NextResponse.json({ error: 'Máximo 3 propiedades destacadas en la home' }, { status: 400 })
  }

  writeLocalProperties(current.map((item) => (item.id === params.id ? property : item)))
  revalidatePath('/')
  revalidatePath('/propiedades')
  revalidatePath(`/propiedades/${params.id}`)
  return NextResponse.json(property)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  const current = readLocalProperties()
  if (!current.some((item) => item.id === params.id)) {
    return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  }

  writeLocalProperties(current.filter((item) => item.id !== params.id))
  revalidatePath('/')
  revalidatePath('/propiedades')
  revalidatePath(`/propiedades/${params.id}`)
  return NextResponse.json({ ok: true })
}
