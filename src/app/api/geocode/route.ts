import { NextRequest, NextResponse } from 'next/server'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { buildGeocodeQuery, geocodeAddress } from '@/lib/geocode.server'

export async function GET(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const address = request.nextUrl.searchParams.get('address')?.trim() || ''
  const province = request.nextUrl.searchParams.get('province')?.trim() || ''

  if (address.length < 5) {
    return NextResponse.json({ error: 'Introduce una dirección más completa' }, { status: 400 })
  }

  const query = buildGeocodeQuery(address, province)
  const result = await geocodeAddress(query)

  if (!result) {
    return NextResponse.json({ error: 'No se encontró la dirección. Prueba a ser más específico.' }, { status: 404 })
  }

  return NextResponse.json(result)
}
