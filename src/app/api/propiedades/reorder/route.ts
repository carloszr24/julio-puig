import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { readLocalProperties, writeLocalProperties } from '@/lib/local-store.server'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

export async function PUT(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  let body: { ids?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const ids = Array.isArray(body.ids) ? body.ids.map(String).filter(Boolean) : []
  if (ids.length === 0) {
    return NextResponse.json({ error: 'Falta la lista de ids' }, { status: 400 })
  }

  const current = readLocalProperties()
  const byId = new Map(current.map((item) => [item.id, item]))
  const reordered = ids
    .map((id, index) => {
      const item = byId.get(id)
      if (!item) return null
      return { ...item, sortOrder: index, updatedAt: new Date() }
    })
    .filter(Boolean)

  const missing = current.filter((item) => !ids.includes(item.id))
  writeLocalProperties([...(reordered as typeof current), ...missing])
  revalidatePath('/propiedades')
  revalidatePath('/')
  return NextResponse.json({ ok: true })
}
