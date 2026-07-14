import Image from 'next/image'
import Link from 'next/link'
import { AGENT, OFFICES } from '@/lib/contact'
import { SERVICE_ITEMS } from '@/data/services'
import { TEAM_MEMBERS, TEAM_QUOTE } from '@/data/team'

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

const serviceIcons = [HomeIcon, ScaleIcon, BankIcon, ClipboardIcon]

const featuredServices = SERVICE_ITEMS.slice(0, 4).map((service, index) => ({
  ...service,
  icon: serviceIcons[index] ?? HomeIcon,
}))

function TeamAvatar({ name, initials, photo }: { name: string; initials: string; photo?: string | null }) {
  if (photo) {
    return (
      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
        <Image src={photo} alt={name} fill className="object-cover" sizes="96px" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-xl font-light tracking-wide text-stone-500">
      {initials}
    </div>
  )
}

export default function SobreNosotrosPage() {
  return (
    <div className="pt-[4.75rem] md:pt-24">
      {/* Intro + historia */}
      <section className="border-b border-stone-200 px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 flex items-center gap-2 text-xs font-light text-stone-400">
            <Link href="/" className="transition-colors hover:text-stone-600">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-stone-600">Sobre nosotros</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-light leading-tight text-stone-900 md:text-5xl lg:text-6xl">
              Una inmobiliaria construida sobre la confianza
            </h1>
            <p className="mt-6 text-base font-light leading-relaxed text-stone-500 md:text-lg">
              En {AGENT.name} acompañamos a familias y particulares en las decisiones más importantes de su
              vida. Sin prisa, sin presión, con la honestidad que cada cliente merece.
            </p>
          </div>

          <div className="my-14 h-px bg-stone-200" />

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                  src="/images/coria.jpg"
                  alt={`Oficina ${AGENT.name} en Coria del Río`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 text-sm font-light text-white/90">
                  {OFFICES.primary.label}, Coria del Río
                </p>
              </div>
              <div className="absolute -bottom-5 right-6 border border-stone-200 bg-white px-5 py-4 shadow-sm md:right-8">
                <p className="font-display text-3xl font-light text-brand-burgundy">41100</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-stone-400">Coria del Río</p>
              </div>
            </div>

            <div className="lg:pt-4">
              <h2 className="font-display text-2xl font-light leading-snug text-stone-900 md:text-3xl">
                Experiencia, cercanía y un trato personalizado en cada operación
              </h2>
              <div className="mt-6 space-y-5 text-sm font-light leading-relaxed text-stone-600 md:text-base">
                <p>
                  {AGENT.name} nace con una idea sencilla: que comprar, vender o alquilar una vivienda no
                  debería ser un proceso frío ni apresurado. Creemos en un enfoque humano, pausado y
                  transparente, en el que usted entienda cada paso y se sienta acompañado en todo momento.
                </p>
                <p>
                  Sabemos que detrás de cada operación hay una decisión que afecta a su vida y a la de su
                  familia. Por eso trabajamos con la misma dedicación en una primera consulta que en el cierre
                  en notaría: escuchamos, informamos y actuamos con la máxima diligencia.
                </p>
                <p>
                  Somos un equipo especializado en el mercado residencial de Coria del Río, el Aljarafe y la
                  provincia de Sevilla. Conocemos la zona, sus barrios y las particularidades de cada
                  operación, y ponemos ese conocimiento al servicio de quien confía en nosotros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios — 4 tarjetas */}
      <section className="bg-stone-50 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-[10px] font-light uppercase tracking-[0.22em] text-brand-burgundy">
              Lo que hacemos
            </p>
            <h2 className="font-display text-3xl font-light text-stone-900 md:text-4xl">Servicios inmobiliarios</h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-stone-500 md:text-base">
              Cuatro áreas de trabajo con las que le acompañamos de principio a fin.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featuredServices.map((service) => (
              <div
                key={service.title}
                className="group border border-stone-200 bg-white p-8 transition-colors duration-300 hover:border-brand-burgundy/30"
              >
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-stone-200 text-stone-600 transition-colors group-hover:border-brand-burgundy/30 group-hover:text-brand-burgundy">
                  <service.icon />
                </span>
                <h3 className="mb-3 font-display text-xl font-light text-stone-900 transition-colors group-hover:text-brand-burgundy">
                  {service.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-stone-500">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo — placeholders para fotos */}
      <section className="border-t border-stone-200 px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <blockquote className="border border-stone-200 bg-stone-50 px-8 py-10 md:px-12 md:py-12">
            <p className="font-display text-2xl font-light leading-relaxed text-stone-800 md:text-3xl">
              “{TEAM_QUOTE.text}”
            </p>
            <footer className="mt-6 text-sm font-light text-stone-500">
              {TEAM_QUOTE.attribution}
              <span className="text-stone-400"> — {TEAM_QUOTE.role}</span>
            </footer>
          </blockquote>

          <div className="mt-20">
            <p className="mb-3 text-[10px] font-light uppercase tracking-[0.22em] text-brand-burgundy">El equipo</p>
            <h2 className="font-display text-3xl font-light text-stone-900 md:text-4xl">Personas, no departamentos</h2>
            <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-stone-500 md:text-base">
              Un equipo reducido y cohesionado, preparado para atenderle con dedicación. Las fotografías se
              irán incorporando en esta sección.
            </p>

            <ul className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
              {TEAM_MEMBERS.map((member) => (
                <li key={member.id} className="text-center">
                  <TeamAvatar name={member.name} initials={member.initials} photo={member.photo} />
                  <p className="mt-5 font-display text-lg font-light text-stone-900">{member.name}</p>
                  <p className="mt-1 text-sm font-light text-stone-500">{member.role}</p>
                  {member.tenure && (
                    <p className="mt-1 text-xs font-light text-stone-400">{member.tenure}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-6 border border-stone-200 bg-white p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h3 className="font-display text-2xl font-light text-stone-900">¿Desea que hablemos?</h3>
              <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-stone-500">
                Sin compromiso. Una primera conversación siempre es gratuita y confidencial.
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-flex shrink-0 items-center gap-2 border border-brand-burgundy px-8 py-3.5 text-[10px] font-light uppercase tracking-[0.14em] text-brand-burgundy transition-colors hover:bg-brand-burgundy hover:text-white"
            >
              Contactar con el equipo
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
