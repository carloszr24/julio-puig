import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { readLocalProperties, writeLocalProperties } from '@/lib/local-store.server'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  let body: { archived?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  if (typeof body.archived !== 'boolean') {
    return NextResponse.json({ error: 'Falta archived (true/false)' }, { status: 400 })
  }

  const current = readLocalProperties()
  const existing = current.find((item) => item.id === params.id)
  if (!existing) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })

  const updated = {
    ...existing,
    archived: body.archived,
    featured: body.archived ? false : existing.featured,
    updatedAt: new Date(),
  }

  writeLocalProperties(current.map((item) => (item.id === params.id ? updated : item)))
  revalidatePath('/')
  revalidatePath('/propiedades')
  revalidatePath(`/propiedades/${params.id}`)
  return NextResponse.json(updated)
}
