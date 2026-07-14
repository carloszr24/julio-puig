'use client'

import Image from 'next/image'

export function HeroCarousel() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src="/images/coria.jpg"
        alt="Coria del Río, Sevilla"
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover brightness-[0.88] saturate-[0.9]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-burgundy-dark/30 via-stone-900/20 to-brand-burgundy/20"
        aria-hidden="true"
      />
    </div>
  )
}
