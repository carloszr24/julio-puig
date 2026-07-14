import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  LOGO_FOOTER_CLASS,
  LOGO_FOOTER_HEIGHT_CLASS,
  LOGO_HEADER_HEIGHT_CLASS,
  LOGO_IMAGE_CLASS,
  LOGO_RENDER,
  LOGO_SRC,
  LOGO_WHITE_SRC,
  type LogoTone,
} from '@/lib/logo'
import { AGENT } from '@/lib/contact'

type Props = {
  className?: string
  variant?: 'header' | 'footer'
  tone?: LogoTone
  priority?: boolean
}

export function SiteLogo({ className, variant = 'header', tone = 'dark', priority = false }: Props) {
  const isFooter = variant === 'footer'
  const resolvedTone = isFooter ? 'dark' : tone
  const imageClass = isFooter ? LOGO_FOOTER_CLASS : LOGO_IMAGE_CLASS
  const sizes = isFooter ? '220px' : '(max-width: 768px) 180px, 220px'

  return (
    <span
      role="img"
      aria-label={AGENT.name}
      className={cn(
        'relative inline-flex shrink-0 items-center',
        isFooter ? LOGO_FOOTER_HEIGHT_CLASS : LOGO_HEADER_HEIGHT_CLASS,
        className
      )}
    >
      <Image
        src={LOGO_WHITE_SRC}
        alt=""
        aria-hidden
        width={LOGO_RENDER.width}
        height={LOGO_RENDER.height}
        sizes={sizes}
        priority={priority}
        className={cn(
          imageClass,
          'site-logo--swap transition-opacity duration-300 ease-in-out',
          resolvedTone === 'light' ? 'opacity-100' : 'opacity-0'
        )}
      />
      <Image
        src={LOGO_SRC}
        alt=""
        aria-hidden
        width={LOGO_RENDER.width}
        height={LOGO_RENDER.height}
        sizes={sizes}
        priority={priority}
        className={cn(
          imageClass,
          'site-logo--swap site-logo--swap-dark absolute inset-0 transition-opacity duration-300 ease-in-out',
          resolvedTone === 'dark' ? 'opacity-100' : 'opacity-0'
        )}
      />
    </span>
  )
}
