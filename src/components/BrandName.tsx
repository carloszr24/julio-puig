import { cn } from '@/lib/utils'

type Props = {
  className?: string
  variant?: 'inline' | 'stacked'
}

export function BrandName({ className, variant = 'inline' }: Props) {
  if (variant === 'stacked') {
    return (
      <span className={cn('site-logo-text', className)}>
        <span className="site-logo-name">Julio Puig</span>
        <span className="site-logo-tagline">Real Estate</span>
      </span>
    )
  }

  return <span className={cn('font-display font-light tracking-[0.02em]', className)}>Julio Puig</span>
}
