'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import type { PropertyMapPoint } from '@/lib/property-map'

const PropertyMap = dynamic(() => import('./PropertyMap.client'), {
  ssr: false,
  loading: () => <div className="skeleton h-[320px] w-full rounded-sm" />,
})

type Props = {
  points: PropertyMapPoint[]
  className?: string
  title?: string
}

export function PropertyMapSection({ points, className, title = 'Mapa' }: Props) {
  if (points.length === 0) return null

  return (
    <section className={cn('space-y-4', className)}>
      <div>
        <h2 className="font-display text-2xl font-light text-stone-900">{title}</h2>
        <p className="mt-1 text-sm font-light text-stone-500">
          {points.length === 1
            ? 'Ubicación exacta de la propiedad'
            : `${points.length} propiedades en el mapa`}
        </p>
      </div>
      <PropertyMap points={points} className="h-[320px] md:h-[420px]" />
    </section>
  )
}

export { PropertyMap }
