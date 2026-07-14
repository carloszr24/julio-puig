import Image from 'next/image'
import { cn } from '@/lib/utils'
import { LOGO_FOOTER_CLASS, LOGO_IMAGE_CLASS, LOGO_RENDER, LOGO_SRC } from '@/lib/logo'
import { AGENT } from '@/lib/contact'

type Props = {
  className?: string
  variant?: 'header' | 'footer'
  priority?: boolean
}

export function SiteLogo({ className, variant = 'header', priority = false }: Props) {
  return (
    <Image
      src={LOGO_SRC}
      alt={AGENT.name}
      width={LOGO_RENDER.width}
      height={LOGO_RENDER.height}
      sizes={variant === 'footer' ? '220px' : '(max-width: 768px) 180px, 220px'}
      priority={priority}
      className={cn(variant === 'footer' ? LOGO_FOOTER_CLASS : LOGO_IMAGE_CLASS, className)}
    />
  )
}
