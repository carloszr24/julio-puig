import type { Metadata } from 'next'
import { AdminNav } from '@/components/admin/AdminNav'

export const metadata: Metadata = {
  title: 'Panel Admin | Julio Puig',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-brand-burgundy text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-display text-lg font-light">
            Julio Puig
            <span className="text-stone-300 text-xs ml-2 font-sans font-light tracking-[0.18em] uppercase">Admin</span>
          </span>
          <AdminNav />
        </div>
        <a href="/" className="text-xs text-stone-300 hover:text-white transition-colors">
          ← Ver web
        </a>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-10">{children}</div>
    </div>
  )
}
