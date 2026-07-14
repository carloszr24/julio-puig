import type { Metadata } from 'next'
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const sans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500'],
})

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Julio Puig | Agencia inmobiliaria',
  description:
    'Compra, venta y alquiler en Coria del Río y provincia de Sevilla. Servicio personalizado y asesoramiento integral.',
  keywords:
    'julio puig, inmobiliaria coria del rio, inmobiliaria sevilla, agencia inmobiliaria, compra vivienda, venta vivienda, alquiler',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-white text-stone-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
