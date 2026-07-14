import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  LOGO_FOOTER_CLASS,
  LOGO_FOOTER_HEIGHT_CLASS,
  LOGO_HEADER_HEIGHT_CLASS,
  LOGO_IMAGE_CLASS,
  LOGO_RENDER,
  LOGO_SRC,
} from '@/lib/logo'
import { AGENT } from '@/lib/contact'

type Props = {
  className?: string
  variant?: 'header' | 'footer'
  priority?: boolean
}

export function SiteLogo({ className, variant = 'header', priority = false }: Props) {
  const isFooter = variant === 'footer'

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center',
        isFooter ? LOGO_FOOTER_HEIGHT_CLASS : LOGO_HEADER_HEIGHT_CLASS,
        className
      )}
    >
      <Image
        src={LOGO_SRC}
        alt={AGENT.name}
        width={LOGO_RENDER.width}
        height={LOGO_RENDER.height}
        sizes={isFooter ? '220px' : '(max-width: 768px) 180px, 220px'}
        priority={priority}
        className={isFooter ? LOGO_FOOTER_CLASS : LOGO_IMAGE_CLASS}
      />
    </span>
  )
}
