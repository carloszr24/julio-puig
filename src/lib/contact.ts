export const CONTACT_EMAIL = ''

export const AGENT = {
  name: 'Julio Puig',
  title: 'Agencia inmobiliaria',
  tagline:
    'Experiencia y dedicación en compra, venta y alquiler con un trato personalizado y profesional.',
} as const

export const LEGAL = {
  ownerName: 'Julio Puig',
  legalForm: 'autónomo',
  taxId: '',
  address: 'C. Cervantes, 70, 41100 Coria del Río, Sevilla',
} as const

export const OFFICES = {
  primary: {
    label: 'Oficina',
    line1: 'C. Cervantes, 70',
    line2: '41100 Coria del Río, Sevilla',
    full: 'C. Cervantes, 70, 41100 Coria del Río, Sevilla',
    mapsQuery: 'Calle+Cervantes+70,+41100+Coria+del+Rio,+Sevilla',
  },
} as const

export const BUSINESS_HOURS = {
  label: 'Horario de atención',
  schedule: [
    { day: 'Lunes', hours: '9:00 – 20:30' },
    { day: 'Martes', hours: '9:00 – 20:00' },
    { day: 'Miércoles', hours: '9:00 – 20:00' },
    { day: 'Jueves', hours: '9:00 – 20:00' },
    { day: 'Viernes', hours: '9:00 – 20:00' },
    { day: 'Sábado', hours: 'Cerrado' },
    { day: 'Domingo', hours: 'Cerrado' },
  ],
} as const

const contactEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? CONTACT_EMAIL).trim()

export const CONTACT = {
  address: OFFICES.primary,
  offices: OFFICES,
  phone: {
    display: '633 71 77 14',
    e164: '+34633717714',
    wa: '34633717714',
    label: 'Teléfono',
  },
  email: contactEmail,
} as const

export const mapsHref = `https://maps.google.com/?q=${CONTACT.address.mapsQuery}`
export const phoneHref = `tel:${CONTACT.phone.e164}`
export const hasEmail = CONTACT.email.length > 0
export const emailHref = hasEmail ? `mailto:${CONTACT.email}` : ''
export const whatsappHref = `https://wa.me/${CONTACT.phone.wa}`
export const whatsappDisplay = `+34 ${CONTACT.phone.display}`
