'use client'

import Link from 'next/link'
import { SERVICE_ITEMS } from '@/data/services'
import { BrandName } from '@/components/BrandName'

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5" aria-hidden="true">
      <path d="M3 11.25 12 4l9 7.25" />
      <path d="M5.25 10.5V20h13.5v-9.5" />
      <path d="M9.75 20v-5.5h4.5V20" />
    </svg>
  )
}

function ScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3v18M5 7h14M7 7l-2 6h4l-2-6M17 7l-2 6h4l-2-6" />
    </svg>
  )
}

function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5" aria-hidden="true">
      <path d="M3 10h18M5 10V20M9 10V20M15 10V20M19 10V20M2 20h20M12 4l8 6H4l8-6Z" />
    </svg>
  )
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5" aria-hidden="true">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5" aria-hidden="true">
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M19 5l2 2" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  )
}

const serviceIcons = [HomeIcon, ScaleIcon, BankIcon, ClipboardIcon, KeyIcon, GlobeIcon]

const services = SERVICE_ITEMS.map((service, index) => ({
  ...service,
  icon: serviceIcons[index] ?? HomeIcon,
}))

export default function SobreNosotrosPage() {
  return (
    <div className="pt-[4.75rem] md:pt-24">
      <section className="bg-brand-burgundy text-white py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.22em] uppercase mb-4 font-light text-stone-200/80">Quiénes somos</p>
          <h1 className="font-display text-5xl md:text-6xl font-light">
            Sobre <BrandName />
          </h1>
          <p className="text-stone-200/85 mt-4 text-lg font-light max-w-2xl leading-relaxed">
            Una inmobiliaria de confianza con amplia experiencia en el sector.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 max-w-4xl mx-auto">
        <div className="space-y-6 text-stone-600 text-lg leading-relaxed font-light text-justify">
          <p>
            Le ayudamos a vender, comprar o alquilar, ofreciendo un servicio integral durante todo el
            proceso.
          </p>
          <p>
            Además de la intermediación inmobiliaria, gestionamos certificados energéticos, revisamos y
            tramitamos la documentación necesaria, y le acompañamos en todos los trámites relacionados con
            el Registro de la Propiedad y la notaría.
          </p>
          <p>
            También prestamos apoyo en situaciones que requieren una gestión más especializada, como
            herencias, adjudicaciones o cualquier operación inmobiliaria que implique trámites complejos.
            Nuestro objetivo es que pueda realizar la operación con seguridad, tranquilidad y el respaldo de
            profesionales que se encargan de todo el proceso.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { value: 'Transparencia', desc: 'Información clara y honesta en cada paso del proceso.' },
            { value: 'Proximidad', desc: 'Le acompañamos personalmente desde el primer contacto.' },
            { value: 'Experiencia', desc: 'Amplia trayectoria ayudando a clientes en todo tipo de operaciones.' },
          ].map((item) => (
            <div key={item.value} className="p-8">
              <div className="w-px h-10 bg-brand-burgundy mx-auto mb-6" />
              <h3 className="font-display text-2xl font-light text-stone-900 mb-3">{item.value}</h3>
              <p className="text-stone-500 text-sm leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-50 py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-burgundy text-[10px] tracking-[0.22em] uppercase mb-4 font-light">Lo que hacemos</p>
            <h2 className="section-title">Servicios inmobiliarios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 border border-stone-100 hover:border-brand-burgundy/30 transition-colors duration-300 group"
              >
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 text-stone-600 group-hover:text-brand-burgundy transition-colors">
                  <service.icon />
                </span>
                <h3 className="font-display text-lg font-light text-stone-900 mb-3 group-hover:text-brand-burgundy transition-colors">
                  {service.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed font-light">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy text-white py-20 px-6 md:px-10 text-center">
        <h2 className="font-display text-4xl font-light mb-6">¿Desea que hablemos?</h2>
        <p className="text-stone-200/85 mb-10 max-w-md mx-auto font-light">
          Cuéntenos su situación y encontraremos la mejor solución para usted.
        </p>
        <Link href="/contacto" className="inline-flex items-center justify-center bg-white text-brand-burgundy px-10 py-4 text-xs font-light tracking-[0.06em] uppercase hover:bg-stone-50 transition-colors">
          Contactar ahora
        </Link>
      </section>
    </div>
  )
}
